import { AbstractParseTreeVisitor } from "antlr4ng";
import {
  ProgContext,
  Stmt_listContext,
  StmtContext,
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
  public instructions: Inst[] = [];

  protected defaultResult(): Item {
    return new Item(Tag.NUMBER, 0, 0);
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

  // `let x : T = expr ;`  →  evaluate expr, discard result
  visitDecl(ctx: DeclContext): Item {
    this.visit(ctx.expr());
    this.instructions.push(new Inst(Bytecode.POP));
    return this.defaultResult();
  }

  visitFn_decl(_ctx: Fn_declContext): Item {
    // Function compilation not implemented yet.
    return this.defaultResult();
  }

  // print(expr);  ->  expr , LDPS "println!" , CALL
  visitPrint_stmt(ctx: Print_stmtContext): Item {
    this.visit(ctx.expr());                               // argument
    this.instructions.push(new Inst(Bytecode.LDPS, "println!")); // closure on top
    this.instructions.push(new Inst(Bytecode.CALL));      // CALL pops closure + arg
    return this.defaultResult();
  }

  visitWhile_loop(ctx: While_loopContext): Item {
    const start = this.instructions.length;
    this.visit(ctx.expr());                // condition
    const jof = new Inst(Bytecode.JOF, 0); // patched later
    this.instructions.push(jof);
    this.visit(ctx.block());               // body
    this.instructions.push(new Inst(Bytecode.GOTO, start));
    jof.operand = this.instructions.length; // jump target
    return this.defaultResult();
  }

  visitBlock(ctx: BlockContext): Item {
    this.visit(ctx.stmt_list());
    return this.defaultResult();
  }

  /* ─────────── Expressions ─────────── */

  // expr #primaryExpr  →  just visit the real primary
  visitPrimaryExpr(ctx: PrimaryExprContext): Item {
    return this.visit(ctx.primary());
  }

  // primary rule with literals, identifiers, (...)
  visitPrimary(ctx: PrimaryContext): Item {
    if (ctx.u32_expr())   return this.visit(ctx.u32_expr()!);
    if (ctx.str_expr())   return this.visit(ctx.str_expr()!);
    if (ctx.bool_expr())  return this.visit(ctx.bool_expr()!);

    if (ctx.IDENTIFIER()) {
      const name = ctx.IDENTIFIER()!.getText();
      this.instructions.push(new Inst(Bytecode.LDHS, name));
      return this.defaultResult();
    }

    // parenthesised / nested expression
    if (ctx.expr()) return this.visit(ctx.expr()!);

    return this.defaultResult();
  }

  /* leaf literals */
  visitU32_expr(ctx: U32_exprContext): Item {
    const val = parseInt(ctx.U32().getText(), 10);
    this.instructions.push(new Inst(Bytecode.LDCI, val));
    return this.defaultResult();
  }

  visitStr_expr(ctx: Str_exprContext): Item {
    const parts = ctx.STRING().map(t => t.getText().slice(1, -1));
    const full  = parts.join("");                // '+' already in grammar
    this.instructions.push(new Inst(Bytecode.LDCS, full));
    return this.defaultResult();
  }

  visitBool_expr(ctx: Bool_exprContext): Item {
    const val = ctx.BOOL().getText() === "true";
    this.instructions.push(new Inst(Bytecode.LDCB, val));
    return this.defaultResult();
  }

  /* unary '!' */
  visitUnaryExpr(ctx: UnaryExprContext): Item {
    this.visit(ctx.expr());
    this.instructions.push(new Inst(Bytecode.NOT));
    return this.defaultResult();
  }

  /* arithmetic +, * (extend as needed) */
  visitBinaryOpExpr(ctx: BinaryOpExprContext): Item {
    this.visit(ctx.expr(0));
    this.visit(ctx.expr(1));
    const op = ctx.INT_OP().getText();
    this.instructions.push(
      new Inst(op === "*" ? Bytecode.TIMES : Bytecode.PLUS)
    );
    return this.defaultResult();
  }

  /* logical &&, || */
  visitLogicalExpr(ctx: LogicalExprContext): Item {
    this.visit(ctx.expr(0));
    this.visit(ctx.expr(1));
    const op = ctx.BOOL_BINOP().getText();
    this.instructions.push(new Inst(op === "&&" ? Bytecode.AND : Bytecode.OR));
    return this.defaultResult();
  }

  /* fallback ‑ recurse */
  visitExpr(ctx: ExprContext): Item {
    return this.visitChildren(ctx);
  }
}

export default RustLikeCompilerVisitor;
