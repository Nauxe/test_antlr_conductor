import { AbstractParseTreeVisitor } from "antlr4ng";
import {
  ProgContext,
  Stmt_listContext,
  DeclContext,
  Fn_declContext,
  Print_stmtContext,
  While_loopContext,
  BlockContext,
  ExprContext,
  UnaryExprContext,
  BinaryOpExprContext,
  LogicalExprContext,
  PrimaryExprContext,
  PrimaryContext,
  U32_exprContext,
  Str_exprContext,
  Bool_exprContext,
} from "./parser/grammar/RustLikeParser";
import { RustLikeVisitor } from "./parser/grammar/RustLikeVisitor";
import { Heap, Item, Tag } from "./Heap";
import { Bytecode, Inst } from "./RustLikeVirtualMachine";

export class RustLikeCompilerVisitor
  extends AbstractParseTreeVisitor<Item>
  implements RustLikeVisitor<Item>
{
  private heap = new Heap(2048);
  /** final output for the VM */
  public instructions: Inst[] = [];

  protected defaultResult(): Item {
    // a dummy UNIT value – used only as visitor return value
    return new Item(Tag.UNIT, 0, 0);
  }

  /* ─────────── Top level ─────────── */
  visitProg(ctx: ProgContext): Item {
    this.visit(ctx.stmt_list());
    this.instructions.push(new Inst(Bytecode.DONE));
    return this.defaultResult();
  }

  visitStmt_list(ctx: Stmt_listContext): Item {
    for (const s of ctx.stmt()) this.visit(s);
    return this.defaultResult();
  }

  /* ─────────── Statements ─────────── */

  // let x : T = expr;
  visitDecl(ctx: DeclContext): Item {
    this.visit(ctx.expr());                 // evaluate RHS
    this.instructions.push(new Inst(Bytecode.POP)); // discard result
    return this.defaultResult();
  }

  /* functions are recognised but not compiled yet */
  visitFn_decl(_ctx: Fn_declContext): Item {
    // TODO: implement proper function compilation.
    return this.defaultResult();
  }

  /* print(expr);  ->  expr · LDPS "println!" · CALL */
  visitPrint_stmt(ctx: Print_stmtContext): Item {
    this.visit(ctx.expr());
    this.instructions.push(new Inst(Bytecode.LDPS, "println!"));
    this.instructions.push(new Inst(Bytecode.CALL));
    return this.defaultResult();
  }

  /* while (cond) { body } */
  visitWhile_loop(ctx: While_loopContext): Item {
    const start = this.instructions.length;
    this.visit(ctx.expr());                       // condition
    const jof = new Inst(Bytecode.JOF, 0);
    this.instructions.push(jof);
    this.visit(ctx.block());                      // body
    this.instructions.push(new Inst(Bytecode.GOTO, start));
    jof.operand = this.instructions.length;       // patch jump target
    return this.defaultResult();
  }

  visitBlock(ctx: BlockContext): Item {
    this.visit(ctx.stmt_list());
    return this.defaultResult();
  }

  /* ─────────── Expressions ─────────── */

  visitPrimaryExpr(ctx: PrimaryExprContext): Item {
    return this.visit(ctx.primary());
  }

  visitPrimary(ctx: PrimaryContext): Item {
    if (ctx.u32_expr())  return this.visit(ctx.u32_expr()!);
    if (ctx.str_expr())  return this.visit(ctx.str_expr()!);
    if (ctx.bool_expr()) return this.visit(ctx.bool_expr()!);

    if (ctx.IDENTIFIER()) {
      const name = ctx.IDENTIFIER()!.getText();
      this.instructions.push(new Inst(Bytecode.LDHS, name));
      return this.defaultResult();
    }

    if (ctx.expr()) return this.visit(ctx.expr()!); // parenthesised
    return this.defaultResult();
  }

  /* literals */
  visitU32_expr(ctx: U32_exprContext): Item {
    const val = parseInt(ctx.U32().getText(), 10);
    this.instructions.push(new Inst(Bytecode.LDCI, val));
    return this.defaultResult();
  }

  visitStr_expr(ctx: Str_exprContext): Item {
    const txt = ctx.STRING().map(t => t.getText().slice(1, -1)).join("");
    this.instructions.push(new Inst(Bytecode.LDCS, txt));
    return this.defaultResult();
  }

  visitBool_expr(ctx: Bool_exprContext): Item {
    const v = ctx.BOOL().getText() === "true";
    this.instructions.push(new Inst(Bytecode.LDCB, v));
    return this.defaultResult();
  }

  /* unary '!' */
  visitUnaryExpr(ctx: UnaryExprContext): Item {
    this.visit(ctx.expr());
    this.instructions.push(new Inst(Bytecode.NOT));
    return this.defaultResult();
  }

  /* arithmetic +  *  (extend as needed) */
  visitBinaryOpExpr(ctx: BinaryOpExprContext): Item {
    this.visit(ctx.expr(0));
    this.visit(ctx.expr(1));
    this.instructions.push(
      new Inst(ctx.INT_OP().getText() === "*" ? Bytecode.TIMES : Bytecode.PLUS)
    );
    return this.defaultResult();
  }

  /* logical && / || */
  visitLogicalExpr(ctx: LogicalExprContext): Item {
    this.visit(ctx.expr(0));
    this.visit(ctx.expr(1));
    this.instructions.push(
      new Inst(ctx.BOOL_BINOP().getText() === "&&" ? Bytecode.AND : Bytecode.OR)
    );
    return this.defaultResult();
  }

  /* fall‑back */
  visitExpr(ctx: ExprContext): Item {
    return this.visitChildren(ctx);
  }
}

export default RustLikeCompilerVisitor;
