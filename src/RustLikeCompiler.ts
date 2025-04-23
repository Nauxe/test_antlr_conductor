// eslint-disable @typescript-eslint/no-unused-vars
import { AbstractParseTreeVisitor } from "antlr4ng";
import {
  ProgContext,
  Stmt_listContext,
  DeclContext,
  Fn_declContext,
  Print_stmtContext,
  While_loopContext,
  Block_stmtContext,
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
  Block_exprContext,
  If_exprContext,
  CallExprContext,
  Array_literalContext,
  Tuple_exprContext,
  Range_exprContext,
  IndexExprContext,
} from "./parser/grammar/RustLikeParser";
import { RustLikeVisitor } from "./parser/grammar/RustLikeVisitor";
import { Heap, Item, Tag } from "./Heap";
import { Bytecode, Inst } from "./RustLikeVirtualMachine";
import { ScopedScannerVisitor } from "./RustLikeTypeChecker";

/*  map supported infix operators to byte-code instruction  */
// only include those the VM natively supports
const OP_TO_BYTE: Record<string, Bytecode> = {
  "+": Bytecode.PLUS,
  "*": Bytecode.TIMES,
  "<": Bytecode.LT,
  "==": Bytecode.EQ,
};

export class RustLikeCompilerVisitor
  extends AbstractParseTreeVisitor<Item>
  implements RustLikeVisitor<Item> {
  private heap = new Heap(2048);
  /** final byte-code output for the VM */
  public instructions: Inst[] = [];

  // counter for generating fresh temporary variable names
  private tmpCounter = 0;
  private freshTemp(): string {
    return `_tmp${this.tmpCounter++}`;
  }

  protected defaultResult(): Item {
    return new Item(Tag.UNIT, 0, 0);
  }

  /* ─────────── Top-level ─────────── */

  visitProg(ctx: ProgContext): Item {
    this.visit(ctx.block_expr() !== null ? ctx.block_expr() : ctx.block_stmt());
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
  visitFn_decl(ctx: Fn_declContext): Item {
    try {
      const fnName = ctx.IDENTIFIER().getText();

      // Check that the function has a type
      if (!ctx.type()) {
        throw new Error(`Function ${fnName} must have a return type`);
      }

      // Explicitly check that the function has a body according to the grammar
      if (!ctx.block_expr()) {
        throw new Error(`Function ${fnName} must have a body`);
      }

      const block = ctx.block_expr();

      // Get parameter names and types
      const paramNames: string[] = [];
      const paramTypes: Item[] = [];

      try {
        if (ctx.param_list_opt() && ctx.param_list_opt().param_list()) {
          const params = ctx.param_list_opt().param_list().param();
          if (params) {
            for (let i = 0; i < params.length; i++) {
              const param = params[i];
              if (param) {
                paramNames.push(param.IDENTIFIER().getText());
                paramTypes.push(new Item(Tag.UNIT, 0, 0)); // TODO: Parse actual types
              }
            }
          }
        }
      } catch (error) {
        console.error("Error parsing parameters:", error);
        throw new Error(`Error in parameter list for function ${fnName}`);
      }

      // Scan the function body to get captured variables
      const scanRes = new ScopedScannerVisitor(block).visit(block);

      // Create closure type
      const closureType = new Item(Tag.CLOSURE, 0, {
        captureNames: scanRes.names,
        captureTypes: scanRes.types,
        paramNames: paramNames,
        paramTypes: paramTypes,
        retType: new Item(Tag.UNIT, 0, 0), // TODO: Parse return type
      });

      // Declare the function
      this.instructions.push(
        new Inst(Bytecode.DECL, {
          name: fnName,
          rustLikeType: closureType,
        })
      );

      // Store current instruction pointer for the function
      const fnStart = this.instructions.length;
      this.instructions.push(new Inst(Bytecode.LDCI, fnStart));
      this.instructions.push(new Inst(Bytecode.ASSIGN, fnName));

      // Enter function scope
      this.instructions.push(new Inst(Bytecode.ENTER_SCOPE, scanRes.names.length + paramNames.length));

      // Bind parameters
      paramNames.forEach((name) => {
        this.instructions.push(
          new Inst(Bytecode.DECL, {
            name,
            rustLikeType: new Item(Tag.UNIT, 0, 0), // TODO: Use actual param types
          })
        );
      });

      // Compile function body - check if block has statements
      if (block.stmt_list() && block.stmt_list().stmt()) {
        const stmts = block.stmt_list().stmt();
        for (let i = 0; i < stmts.length; i++) {
          if (stmts[i]) this.visit(stmts[i]);
        }
      }

      // Compile the expression at the end of the block
      if (block.expr()) {
        this.visit(block.expr());
      } else {
        // If no expression, add a unit value
        this.instructions.push(new Inst(Bytecode.LDCI, 0)); // UNIT value
      }

      // Exit function scope and return
      this.instructions.push(new Inst(Bytecode.EXIT_SCOPE));
      this.instructions.push(new Inst(Bytecode.RET));

      return this.defaultResult();
    } catch (error) {
      console.error("Error in function declaration:", error);
      throw error;
    }
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
    this.visit(ctx.block_stmt());
    this.instructions.push(new Inst(Bytecode.GOTO, top));
    jof.operand = this.instructions.length;
    return this.defaultResult();
  }

  visitBlock_stmt(ctx: Block_stmtContext): Item {
    // Visit all statements
    ctx.stmt_list().stmt().forEach((stmt) => this.visit(stmt));

    // Return unit type for block statements
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

    /* treat "true / false" identifiers as literals         */
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
    return this.visitChildren(ctx);
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
    const lhs = ctx.expr(0);
    const rhs = ctx.expr(1);
    const op = ctx.INT_OP().getText();

    if (op === "-") {
      // a - b  ⇒  a; b; -1; TIMES; PLUS
      this.visit(lhs);
      this.visit(rhs);
      this.instructions.push(new Inst(Bytecode.LDCI, -1));
      this.instructions.push(new Inst(Bytecode.TIMES));
      this.instructions.push(new Inst(Bytecode.PLUS));

    } else if (op === "/" || op === "%") {
      // a / b or a % b ⇒ repeated subtraction loop
      const tDivd = this.freshTemp();
      const tDivs = this.freshTemp();
      const tQuot = this.freshTemp();

      // declare temps
      [tDivd, tDivs, tQuot].forEach((name) =>
        this.instructions.push(
          new Inst(Bytecode.DECL, {
            name,
            rustLikeType: new Item(Tag.NUMBER, 0, 0),
          })
        )
      );

      // dividend = a
      this.visit(lhs);
      this.instructions.push(new Inst(Bytecode.ASSIGN, tDivd));
      // divisor = b
      this.visit(rhs);
      this.instructions.push(new Inst(Bytecode.ASSIGN, tDivs));
      // quotient = 0
      this.instructions.push(new Inst(Bytecode.LDCI, 0));
      this.instructions.push(new Inst(Bytecode.ASSIGN, tQuot));

      // loop start
      const loopStart = this.instructions.length;
      // if dividend < divisor then exit
      this.instructions.push(new Inst(Bytecode.LDHS, tDivd));
      this.instructions.push(new Inst(Bytecode.LDHS, tDivs));
      this.instructions.push(new Inst(Bytecode.LT));
      const jof = new Inst(Bytecode.JOF, 0);
      this.instructions.push(jof);

      // body: dividend = dividend - divisor
      this.instructions.push(new Inst(Bytecode.LDHS, tDivd));
      this.instructions.push(new Inst(Bytecode.LDHS, tDivs));
      this.instructions.push(new Inst(Bytecode.LDCI, -1));
      this.instructions.push(new Inst(Bytecode.TIMES));
      this.instructions.push(new Inst(Bytecode.PLUS));
      this.instructions.push(new Inst(Bytecode.ASSIGN, tDivd));

      // quotient = quotient + 1
      this.instructions.push(new Inst(Bytecode.LDHS, tQuot));
      this.instructions.push(new Inst(Bytecode.LDCI, 1));
      this.instructions.push(new Inst(Bytecode.PLUS));
      this.instructions.push(new Inst(Bytecode.ASSIGN, tQuot));

      // goto loop start
      this.instructions.push(new Inst(Bytecode.GOTO, loopStart));
      // patch exit
      jof.operand = this.instructions.length;

      // leave result
      const resultTemp = op === "/" ? tQuot : tDivd;
      this.instructions.push(new Inst(Bytecode.LDHS, resultTemp));

    } else if (op === ">") {
      // a > b ⇒ b < a
      this.visit(rhs);
      this.visit(lhs);
      this.instructions.push(new Inst(Bytecode.LT));

    } else if (op === "<=") {
      // a <= b ⇒ !(b < a)
      this.visit(rhs);
      this.visit(lhs);
      this.instructions.push(new Inst(Bytecode.LT));
      this.instructions.push(new Inst(Bytecode.NOT));

    } else if (op === ">=") {
      // a >= b ⇒ !(a < b)
      this.visit(lhs);
      this.visit(rhs);
      this.instructions.push(new Inst(Bytecode.LT));
      this.instructions.push(new Inst(Bytecode.NOT));

    } else if (op === "!=") {
      // a != b ⇒ !(a == b)
      this.visit(lhs);
      this.visit(rhs);
      this.instructions.push(new Inst(Bytecode.EQ));
      this.instructions.push(new Inst(Bytecode.NOT));

    } else {
      // fallback for +, *, <, ==
      this.visit(lhs);
      this.visit(rhs);
      this.instructions.push(new Inst(OP_TO_BYTE[op]));
    }

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
      may generate for any other constructs       */
  visitExpr(ctx: ExprContext): Item {
    if (ctx.getChildCount() === 2) {
      // Handle unary operators including ref and deref
      const op = ctx.getChild(0).getText();
      const expr = ctx.getChild(1) as ExprContext;

      if (op === '&') {
        this.visit(expr);
        this.instructions.push(new Inst(Bytecode.REF));
        return this.defaultResult();
      } else if (op === '*') {
        this.visit(expr);
        this.instructions.push(new Inst(Bytecode.DEREF));
        return this.defaultResult();
      }
    }

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

      // all other binary ops handled above in visitBinaryOpExpr
    }
    return this.visitChildren(ctx);
  }

  visitBlock_expr(ctx: Block_exprContext): Item {
    try {
      // Visit all statements
      if (ctx.stmt_list() && ctx.stmt_list().stmt()) {
        const stmts = ctx.stmt_list().stmt();
        for (let i = 0; i < stmts.length; i++) {
          if (stmts[i]) this.visit(stmts[i]);
        }
      }

      // Visit the final expression if it exists
      if (ctx.expr()) {
        return this.visit(ctx.expr());
      } else {
        // No expression in the block, return unit value
        this.instructions.push(new Inst(Bytecode.LDCI, 0)); // UNIT value
        return this.defaultResult();
      }
    } catch (error) {
      console.error("Error in block expression:", error);
      throw new Error(`Error in block expression: ${error.message}`);
    }
  }

  visitIf_expr(ctx: If_exprContext): Item {
    // Evaluate condition
    this.visit(ctx.expr());

    // Jump if false to else branch
    const jof = new Inst(Bytecode.JOF, 0);
    this.instructions.push(jof);

    // Compile then branch
    const thenResult = this.visit(ctx.block_expr()[0]);

    // Jump over else branch
    const goto = new Inst(Bytecode.GOTO, 0);
    this.instructions.push(goto);

    // Patch jump if false to else branch
    jof.operand = this.instructions.length;

    // Compile else branch
    const elseResult = this.visit(ctx.block_expr()[1]);

    // Patch jump over else branch
    goto.operand = this.instructions.length;

    return thenResult; // Both branches should have same type
  }

  visitCallExpr(ctx: CallExprContext): Item {
    // Evaluate receiver
    this.visit(ctx.expr());

    // Evaluate arguments in order
    if (ctx.arg_list_opt().expr() !== null) {
      ctx.arg_list_opt().expr().forEach((arg) => {
        this.visit(arg);
      });
    }

    // Call the function
    this.instructions.push(new Inst(Bytecode.CALL));

    return this.defaultResult();
  }

  visitArray_literal(ctx: Array_literalContext): Item {
    // Evaluate all elements
    if (ctx.expr() !== null) {
      ctx.expr().forEach((elem) => {
        this.visit(elem);
      });
      // Create array from elements
      this.instructions.push(new Inst(Bytecode.NEW_ARRAY, ctx.expr().length));
    } else {
      // Empty array
      this.instructions.push(new Inst(Bytecode.NEW_ARRAY, 0));
    }
    return this.defaultResult();
  }

  visitTuple_expr(ctx: Tuple_exprContext): Item {
    // Evaluate all elements
    if (ctx.expr() !== null) {
      ctx.expr().forEach((elem) => {
        this.visit(elem);
      });
      // Create tuple from elements
      this.instructions.push(new Inst(Bytecode.NEW_TUPLE, ctx.expr().length));
    } else {
      // Empty tuple
      this.instructions.push(new Inst(Bytecode.NEW_TUPLE, 0));
    }
    return this.defaultResult();
  }

  visitRange_expr(ctx: Range_exprContext): Item {
    // Evaluate start and end
    this.visit(ctx.u32_expr(0));
    this.visit(ctx.u32_expr(1));

    // Create range
    this.instructions.push(new Inst(Bytecode.NEW_RANGE));

    return this.defaultResult();
  }

  visitIndexExpr(ctx: IndexExprContext): Item {
    // Evaluate array/string
    this.visit(ctx.expr(0));

    // Evaluate index
    this.visit(ctx.expr(1));

    // Index into container
    this.instructions.push(new Inst(Bytecode.INDEX));

    return this.defaultResult();
  }
}

export default RustLikeCompilerVisitor;
