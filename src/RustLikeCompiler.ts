// eslint-disable @typescript-eslint/no-unused-vars
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
  Expr_stmtContext,
} from "./parser/grammar/RustLikeParser";
import { RustLikeVisitor } from "./parser/grammar/RustLikeVisitor";
import { Heap, Item, Tag } from "./Heap";
import { Bytecode, Inst } from "./RustLikeVirtualMachine";

/*  map every infix operator to the corresponding byte-code instruction  */
const OP_TO_BYTE: Record<string, Bytecode> = {
  "+": Bytecode.PLUS,
  "-": Bytecode.MINUS,
  "*": Bytecode.TIMES,
  "/": Bytecode.DIV,
  "%": Bytecode.MOD,
  "<": Bytecode.LT,
  "<=": Bytecode.LE,
  ">=": Bytecode.GE,
  "==": Bytecode.EQ,
  "!=": Bytecode.NE,
};

export class RustLikeCompilerVisitor
  extends AbstractParseTreeVisitor<Item>
  implements RustLikeVisitor<Item>
{
  private heap = new Heap(2048);
  /** final byte-code output for the VM */
  public instructions: Inst[] = [];

  protected defaultResult(): Item {
    return new Item(Tag.UNIT, 0, 0);
  }

  /* ─────────── Top-level ─────────── */

  visitProg(ctx: ProgContext): Item {
    this.visit(ctx.stmt_list());
    this.instructions.push(new Inst(Bytecode.DONE));
    return this.defaultResult();
  }

  visitStmt_list(ctx: Stmt_listContext): Item {
    ctx.stmt().forEach((s) => this.visit(s));
    return this.defaultResult();
  }

  /* ─────────── Statements ─────────── */

  visitDecl(ctx: DeclContext): Item {
    /* grammar:  let IDENTIFIER ( : type )? ( = expr )? ; */

    const varName = ctx.IDENTIFIER().getText();
    /* allocate a slot */
    this.instructions.push(
      new Inst(Bytecode.DECL, {
        name: varName,
        rustLikeType: new Item(Tag.UNIT, 0, 0), // placeholder type info
      })
    );

    if (ctx.expr()) {
      /* evaluate RHS, then store it */
      this.visit(ctx.expr()!);
      this.instructions.push(new Inst(Bytecode.ASSIGN, varName));
    }
    /* nothing left on the stack */
    return this.defaultResult();
  }

  /* functions are recognised but not compiled yet */
  visitFn_decl(_: Fn_declContext): Item {
    return this.defaultResult();
  }

  /*  print!(expr);   ->   expr  ·  LDPS "print!"  ·  CALL  */
  visitPrint_stmt(ctx: Print_stmtContext): Item {
    this.visit(ctx.expr());
    this.instructions.push(new Inst(Bytecode.LDPS, "print!"));
    this.instructions.push(new Inst(Bytecode.CALL));
    return this.defaultResult();
  }

  /* while (cond) { body } */
  visitWhile_loop(ctx: While_loopContext): Item {
    const top = this.instructions.length;
    this.visit(ctx.expr()); // condition
    const jof = new Inst(Bytecode.JOF, 0);
    this.instructions.push(jof);
    this.visit(ctx.block());
    this.instructions.push(new Inst(Bytecode.GOTO, top));
    jof.operand = this.instructions.length;
    return this.defaultResult();
  }

  visitBlock(ctx: BlockContext): Item {
    /* each statement* except the last behaves as usual */
    const stmts = ctx.stmt_list().stmt();
    stmts.slice(0, -1).forEach((s) => this.visit(s));

    /* the last statement decides the block value           */
    if (stmts.length) this.visit(stmts[stmts.length - 1]);
    else this.instructions.push(new Inst(Bytecode.LDCB, true)); // empty block ⇒ true

    return this.defaultResult();
  }

  /* expression used *as* a statement     */
  visitExpr_stmt(ctx: Expr_stmtContext): Item {
    this.visit(ctx.expr());
    this.instructions.push(new Inst(Bytecode.POP));
    return this.defaultResult();
  }

  /* ─────────── Expressions ─────────── */

  visitPrimaryExpr(ctx: PrimaryExprContext): Item {
    return this.visit(ctx.primary());
  }

  visitPrimary(ctx: PrimaryContext): Item {
    if (ctx.u32_expr()) return this.visit(ctx.u32_expr()!);
    if (ctx.str_expr()) return this.visit(ctx.str_expr()!);
    if (ctx.bool_expr()) return this.visit(ctx.bool_expr()!);

    /* treat “true / false” identifiers as literals         */
    if (ctx.IDENTIFIER()) {
      const name = ctx.IDENTIFIER()!.getText();
      if (name === "true" || name === "false") {
        this.instructions.push(
          new Inst(Bytecode.LDCB, name === "true")
        );
      } else {
        this.instructions.push(new Inst(Bytecode.LDHS, name));
      }
      return this.defaultResult();
    }

    if (ctx.expr()) return this.visit(ctx.expr()!); // parenthesised
    return this.defaultResult();
  }

  /* ───── literals ───── */
  visitU32_expr(ctx: U32_exprContext): Item {
    this.instructions.push(
      new Inst(Bytecode.LDCI, parseInt(ctx.U32().getText(), 10))
    );
    return this.defaultResult();
  }

  visitStr_expr(ctx: Str_exprContext): Item {
    const txt = ctx
      .STRING()
      .map((t) => t.getText().slice(1, -1))
      .join("");
    this.instructions.push(new Inst(Bytecode.LDCS, txt));
    return this.defaultResult();
  }

  visitBool_expr(ctx: Bool_exprContext): Item {
    this.instructions.push(
      new Inst(Bytecode.LDCB, ctx.BOOL().getText() === "true")
    );
    return this.defaultResult();
  }

  /* unary '!' */
  visitUnaryExpr(ctx: UnaryExprContext): Item {
    this.visit(ctx.expr());
    this.instructions.push(new Inst(Bytecode.NOT));
    return this.defaultResult();
  }

  /* arithmetic / comparison  */
  visitBinaryOpExpr(ctx: BinaryOpExprContext): Item {
    this.visit(ctx.expr(0));
    this.visit(ctx.expr(1));

    const op = ctx.INT_OP().getText(); // rule covers + - * / %
    this.instructions.push(new Inst(OP_TO_BYTE[op]));
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

  /*  catch-all infix expression that the grammar
      may generate for comparisons and remaining ops       */
  visitExpr(ctx: ExprContext): Item {
    if (ctx.getChildCount() === 3) {
      const lhs = ctx.getChild(0) as ExprContext;
      const opTxt = ctx.getChild(1).getText();
      const rhs = ctx.getChild(2) as ExprContext;

      if (OP_TO_BYTE[opTxt]) {
        this.visit(lhs);
        this.visit(rhs);
        this.instructions.push(new Inst(OP_TO_BYTE[opTxt]));
        return this.defaultResult();
      }
      

      /* “>” is compiled as the reversed <  */
      if (opTxt === ">") {
        this.visit(rhs);
        this.visit(lhs);
        this.instructions.push(new Inst(Bytecode.LT));
        return this.defaultResult();
      }
    }
    return this.visitChildren(ctx);
  }
}

export default RustLikeCompilerVisitor;
