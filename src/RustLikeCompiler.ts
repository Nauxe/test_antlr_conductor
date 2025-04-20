import { CharStream, CommonTokenStream, AbstractParseTreeVisitor } from 'antlr4ng';
import { RustLikeLexer } from './parser/grammar/RustLikeLexer';
import { RustLikeParser, ProgContext, Stmt_listContext, DeclContext, Fn_declContext,
         Print_stmtContext, Bool_stmtContext, While_loopContext, For_loopContext,
         BlockContext, ExpressionContext, Int_exprContext, Str_exprContext,
         Bool_exprContext, TupleContext, Expr_listContext, ExprContext,
         TypeContext, Type_listContext, Tuple_typeContext } from './parser/grammar/RustLikeParser';
import { RustLikeVisitor } from './parser/grammar/RustLikeVisitor';
import { JS_value_to_Item, Item, Heap, Tag, is_primitive } from './Heap';
import { Bytecode, Inst } from './RustLikeVirtualMachine';

export class RustLikeCompilerVisitor extends AbstractParseTreeVisitor<Item> implements RustLikeVisitor<Item> {
  private heap = new Heap(2048);
  private instructions: Inst[] = [];

  protected defaultResult(): Item {
    return new Item(Tag.NUMBER, 0, 0);
  }

  visitProg(ctx: ProgContext): Item {
    this.visit(ctx.block());
    this.instructions.push(new Inst(Bytecode.DONE));
    return this.defaultResult();
  }

  visitStmt_list(ctx: Stmt_listContext): Item {
    for (const stmt of ctx.stmt()) {
      this.visit(stmt);
    }
    return this.defaultResult();
  }

  visitDecl(ctx: DeclContext): Item {
    const name = ctx.IDENTIFIER().getText();
    this.visit(ctx.expr());           // generate code to push value
    this.instructions.push(new Inst(Bytecode.LDS, name));
    this.instructions.push(new Inst(Bytecode.ASSIGN, name));
    return this.defaultResult();
  }

  visitFn_decl(ctx: Fn_declContext): Item {
    // TODO: function compilation
    return this.defaultResult();
  }

  visitPrint_stmt(ctx: Print_stmtContext): Item {
    this.visit(ctx.expr());
    this.instructions.push(new Inst(Bytecode.PRINT));
    return this.defaultResult();
  }

  visitBool_stmt(ctx: Bool_stmtContext): Item {
    this.visit(ctx.bool_expr());
    return this.defaultResult();
  }

  visitWhile_loop(ctx: While_loopContext): Item {
    const start = this.instructions.length;
    this.visit(ctx.bool_expr());
    const jofInst = new Inst(Bytecode.JOF, 0);
    this.instructions.push(jofInst);
    this.visit(ctx.block());
    this.instructions.push(new Inst(Bytecode.GOTO, start));
    jofInst.operand = this.instructions.length;
    return this.defaultResult();
  }

  visitFor_loop(ctx: For_loopContext): Item {
    // TODO: compile for-loop
    return this.defaultResult();
  }

  visitBlock(ctx: BlockContext): Item {
    this.visit(ctx.stmt_list());
    return this.defaultResult();
  }

  visitExpression(ctx: ExpressionContext): Item {
    if (ctx.int_expr()) return this.visit(ctx.int_expr()!);
    if (ctx.str_expr()) return this.visit(ctx.str_expr()!);
    if (ctx.bool_expr()) return this.visit(ctx.bool_expr()!);
    return this.defaultResult();
  }

  visitInt_expr(ctx: Int_exprContext): Item {
    const texts = ctx.INT().map(tok => tok.getText());
    const a = parseInt(texts[0], 10);
    this.instructions.push(new Inst(Bytecode.LDCI, a));
    if (ctx.INT_OP()) {
      const b = parseInt(texts[1], 10);
      this.instructions.push(new Inst(ctx.INT_OP()!.getText() === '+' ? Bytecode.PLUS : Bytecode.TIMES));
    }
    return this.defaultResult();
  }

  visitStr_expr(ctx: Str_exprContext): Item {
    // get all STRING tokens
    const stringNodes = ctx.STRING();
    // strip the surrounding quotes
    const pieces = stringNodes.map(n => n.getText().slice(1, -1));

    // look for a '+' literal (that's T__15 in the grammar)
    const plusNode = ctx.getToken(RustLikeParser.T__15, 0);
    const sep = plusNode ? plusNode.getText() : "";

    // reassemble the JS string value
    const s = pieces.join(sep);

    // turn it into a heap‐allocated Item
    const bytes = s.length;
    const it = this.heap.allocate(Tag.STRING, bytes);
    this.heap.set_data(it, s);
    return it;
  }

  visitBool_expr(ctx: Bool_exprContext): Item {
    const val = ctx.BOOL()[0].getText() === 'true';
    this.instructions.push(new Inst(Bytecode.LDCB, val));
    if (ctx.BOOL_BINOP()) {
      this.visit(ctx.bool_expr()!);
      this.instructions.push(new Inst(ctx.BOOL_BINOP()!.getText() === '&&' ? Bytecode.AND : Bytecode.OR));
    }
    return this.defaultResult();
  }

  visitTuple(ctx: TupleContext): Item {
    // TODO: compile tuple
    return this.defaultResult();
  }

  visitExpr_list(ctx: Expr_listContext): Item {
    for (const expr of ctx.expr()) this.visit(expr);
    return this.defaultResult();
  }

  visitExpr(ctx: ExprContext): Item {
    return this.visitExpression(ctx);
  }

  visitType(ctx: TypeContext): Item { return this.defaultResult(); }
  visitType_list(ctx: Type_listContext): Item { return this.defaultResult(); }
  visitTuple_type(ctx: Tuple_typeContext): Item { return this.defaultResult(); }

  /**
   * param_list_opt : empty  |  param_list
   */
  visitParam_list_opt(ctx: any): Item {
    if (ctx.param_list()) this.visit(ctx.param_list()!);
    return this.defaultResult();
  }

  visitParam_list(ctx: any): Item { return this.defaultResult(); }
  visitParam(ctx: any): Item { return this.defaultResult(); }
}

export default RustLikeCompilerVisitor;
