// eslint-disable @typescript-eslint/no-unused-vars
import { AbstractParseTreeVisitor } from "antlr4ng";
import {
  ProgContext,
  Stmt_listContext,
  StmtContext,
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

// Add this near the top of the file, after other imports
class Frame {
  declarations: Map<string, number> = new Map();
}

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
  frames: Frame[] = [new Frame()]; // Add global frame

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
    console.log("Visiting program:", ctx.getText());
    console.log("Program has children:", ctx.getChildCount());
    for (let i = 0; i < ctx.getChildCount(); i++) {
      console.log(`Child ${i} type:`, ctx.getChild(i).constructor.name);
    }
    
    // First scan declarations to build the type environment
    new ScopedScannerVisitor(ctx).visit(ctx);
    
    // Visit all children of the program
    for (let i = 0; i < ctx.getChildCount(); i++) {
      const child = ctx.getChild(i);
      console.log(`Processing child ${i}:`, child.constructor.name);
      
      // Handle known node types
      if (child.constructor.name.includes("Block_stmt")) {
        console.log("Processing block statement");
        this.visit(child);
      } else if (child.constructor.name.includes("Block_expr")) {
        console.log("Processing block expression");
        this.visit(child);
      } else {
        // For other types, use the default visit mechanism
        try {
          console.log("Trying to visit child directly");
          this.visit(child);
        } catch (e) {
          console.error("Error visiting child:", e);
        }
      }
    }

    // Add DONE instruction
    this.instructions.push(new Inst(Bytecode.DONE));
    return this.defaultResult();
  }

  visitStmt_list(ctx: Stmt_listContext): Item {
    console.log("Visiting statement list");
    
    if (!ctx.stmt()) {
      console.log("No statements in list");
      return this.defaultResult();
    }
    
    console.log("Number of statements:", ctx.stmt().length);
    
    // Visit each statement in the list
    for (let i = 0; i < ctx.stmt().length; i++) {
      const stmt = ctx.stmt(i);
      console.log(`Processing statement ${i}:`, 
        stmt.fn_decl() ? "fn_decl" : 
        stmt.decl() ? "decl" : 
        stmt.expr_stmt() ? `expr_stmt(${stmt.expr_stmt()?.expr().getText()})` : 
        "other_stmt"
      );
      
      const result = this.visit(stmt);
      console.log(`Instructions after statement ${i}:`, this.instructions.length);
    }
    
    return this.defaultResult();
  }

  visitStmt(ctx: StmtContext): Item {
    console.log("Visiting statement");
    
    if (ctx.decl()) {
      console.log("Found declaration");
      return this.visit(ctx.decl());
    }
    
    if (ctx.fn_decl()) {
      console.log("Found function declaration");
      return this.visit(ctx.fn_decl());
    }
    
    if (ctx.print_stmt()) {
      console.log("Found print statement");
      return this.visit(ctx.print_stmt());
    }
    
    if (ctx.if_stmt()) {
      console.log("Found if statement");
      return this.visit(ctx.if_stmt());
    }
    
    if (ctx.while_loop()) {
      console.log("Found while loop");
      return this.visit(ctx.while_loop());
    }
    
    if (ctx.expr_stmt()) {
      console.log("Found expression statement:", ctx.expr_stmt().expr().getText());
      return this.visit(ctx.expr_stmt());
    }
    
    if (ctx.block_stmt()) {
      console.log("Found block statement");
      return this.visit(ctx.block_stmt());
    }
    
    // Fallback
    console.log("Unhandled statement type");
    return this.visitChildren(ctx);
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

      // Check that the function has a body according to the grammar
      const blockExpr = ctx.block_expr();
      const blockStmt = ctx.block_stmt();
      if (!blockExpr && !blockStmt) {
        throw new Error(`Function ${fnName} must have a body`);
      }

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
                paramTypes.push(this.visit(param.type()));
              }
            }
          }
        }
      } catch (error) {
        console.error("Error parsing parameters:", error);
        throw new Error(`Error in parameter list for function ${fnName}`);
      }

      // Scan the function body to get captured variables
      const scanRes = blockExpr 
        ? new ScopedScannerVisitor(blockExpr).visit(blockExpr)
        : new ScopedScannerVisitor(blockStmt).visit(blockStmt);

      // Create closure type
      const closureType = new Item(Tag.CLOSURE, 0, {
        captureNames: scanRes.names,
        captureTypes: scanRes.types,
        paramNames: paramNames,
        paramTypes: paramTypes,
        retType: this.visit(ctx.type()),
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
      for (let i = 0; i < paramNames.length; i++) {
        this.instructions.push(
          new Inst(Bytecode.DECL, {
            name: paramNames[i],
            rustLikeType: paramTypes[i],
          })
        );
      }

      // Compile function body
      if (blockExpr) {
        // For block_expr, compile statements and final expression
        if (blockExpr.stmt_list() && blockExpr.stmt_list().stmt()) {
          const stmts = blockExpr.stmt_list().stmt();
          for (let i = 0; i < stmts.length; i++) {
            if (stmts[i]) this.visit(stmts[i]);
          }
        }

        // Compile the expression at the end of the block
        if (blockExpr.expr()) {
          this.visit(blockExpr.expr());
        } else {
          // If no expression, add a unit value
          this.instructions.push(new Inst(Bytecode.LDCI, 0)); // UNIT value
        }
      } else if (blockStmt) {
        // For block_stmt, compile statements and add unit return value
        if (blockStmt.stmt_list() && blockStmt.stmt_list().stmt()) {
          const stmts = blockStmt.stmt_list().stmt();
          for (let i = 0; i < stmts.length; i++) {
            if (stmts[i]) this.visit(stmts[i]);
          }
        }
        // Add unit return value for block_stmt
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
    console.log("Visiting block statement:", ctx.getText());
    
    // Enter block scope
    this.instructions.push(new Inst(Bytecode.ENTER_SCOPE, 0));
    console.log("Added ENTER_SCOPE instruction");

    // Visit all statements in the block
    if (ctx.stmt_list() && ctx.stmt_list().stmt()) {
      const stmts = ctx.stmt_list().stmt();
      console.log("Number of statements in block:", stmts.length);
      
      for (let i = 0; i < stmts.length; i++) {
        if (stmts[i]) {
          console.log(`Processing statement ${i} in block:`, 
            stmts[i].fn_decl() ? "fn_decl" : 
            stmts[i].decl() ? "decl" : 
            stmts[i].expr_stmt() ? `expr_stmt(${stmts[i].expr_stmt()?.expr().getText()})` : 
            "other_stmt"
          );
          this.visit(stmts[i]);
          console.log(`Instructions after statement ${i}:`, this.instructions.length);
        }
      }
    } else {
      console.log("No statements in block");
    }

    // Exit block scope
    this.instructions.push(new Inst(Bytecode.EXIT_SCOPE));
    console.log("Added EXIT_SCOPE instruction");

    // Return unit type for block statements
    return this.defaultResult();
  }

  /* expression used *as* a statement */
  visitExpr_stmt(ctx: Expr_stmtContext): Item {
    try {
      console.log("Visiting expression statement:", ctx.getText());
      // Visit the expression, which will generate the bytecode for it
      const result = this.visit(ctx.expr());
      
      // Add POP instruction to discard the expression result in statement context
      // This is necessary because expressions in statement context don't return values
      this.instructions.push(new Inst(Bytecode.POP));
      console.log("Added POP instruction for expression statement");
      
      return result;
    } catch (error) {
      console.error("Error in expression statement:", error);
      throw error;
    }
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
    console.log("Visiting binary op expression:", ctx.getText());
    
    const lhs = ctx.expr(0);
    const rhs = ctx.expr(1);
    const op = ctx.INT_OP().getText();
    
    console.log("Binary operation:", lhs.getText(), op, rhs.getText());

    if (op === "-") {
      console.log("Generating subtraction code");
      // a - b  ⇒  a; b; -1; TIMES; PLUS
      this.visit(lhs);
      this.visit(rhs);
      this.instructions.push(new Inst(Bytecode.LDCI, -1));
      this.instructions.push(new Inst(Bytecode.TIMES));
      this.instructions.push(new Inst(Bytecode.PLUS));
      console.log("Added subtraction instructions, count:", this.instructions.length);

    } else if (op === "/" || op === "%") {
      console.log("Generating division/modulo code");
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
      console.log("Added division/modulo instructions");

    } else if (op === ">") {
      console.log("Generating greater-than code");
      // a > b ⇒ b < a
      this.visit(rhs);
      this.visit(lhs);
      this.instructions.push(new Inst(Bytecode.LT));
      console.log("Added greater-than instructions");

    } else if (op === "<=") {
      console.log("Generating less-than-or-equal code");
      // a <= b ⇒ !(b < a)
      this.visit(rhs);
      this.visit(lhs);
      this.instructions.push(new Inst(Bytecode.LT));
      this.instructions.push(new Inst(Bytecode.NOT));
      console.log("Added less-than-or-equal instructions");

    } else if (op === ">=") {
      console.log("Generating greater-than-or-equal code");
      // a >= b ⇒ !(a < b)
      this.visit(lhs);
      this.visit(rhs);
      this.instructions.push(new Inst(Bytecode.LT));
      this.instructions.push(new Inst(Bytecode.NOT));
      console.log("Added greater-than-or-equal instructions");

    } else if (op === "!=") {
      console.log("Generating not-equal code");
      // a != b ⇒ !(a == b)
      this.visit(lhs);
      this.visit(rhs);
      this.instructions.push(new Inst(Bytecode.EQ));
      this.instructions.push(new Inst(Bytecode.NOT));
      console.log("Added not-equal instructions");

    } else {
      console.log(`Generating fallback code for operator: ${op}`);
      // fallback for +, *, <, ==
      this.visit(lhs);
      this.visit(rhs);
      this.instructions.push(new Inst(OP_TO_BYTE[op]));
      console.log(`Added ${op} instruction:`, OP_TO_BYTE[op], "count:", this.instructions.length);
    }

    console.log("Binary op expression result, instruction count:", this.instructions.length);
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
    console.log("Visiting expression:", ctx.getText());
    console.log("Child count:", ctx.getChildCount());
    
    if (ctx.getChildCount() === 2) {
      // Handle unary operators including ref and deref
      const op = ctx.getChild(0).getText();
      const expr = ctx.getChild(1) as ExprContext;
      console.log("Unary expression:", op, expr.getText());

      if (op === '&') {
        this.visit(expr);
        this.instructions.push(new Inst(Bytecode.REF));
        console.log("Added REF instruction");
        return this.defaultResult();
      } else if (op === '*') {
        this.visit(expr);
        this.instructions.push(new Inst(Bytecode.DEREF));
        console.log("Added DEREF instruction");
        return this.defaultResult();
      }
    }

    if (ctx.getChildCount() === 3) {
      const lhs = ctx.getChild(0) as ExprContext;
      const opTxt = ctx.getChild(1).getText();
      const rhs = ctx.getChild(2) as ExprContext;
      console.log("Binary expression:", lhs.getText(), opTxt, rhs.getText());

      if (OP_TO_BYTE[opTxt]) {
        console.log("Found operator in OP_TO_BYTE map:", opTxt);
        this.visit(lhs);
        this.visit(rhs);
        this.instructions.push(new Inst(OP_TO_BYTE[opTxt]));
        console.log("Added binary op instruction:", OP_TO_BYTE[opTxt]);
        return this.defaultResult();
      }

      // all other binary ops handled above in visitBinaryOpExpr
      console.log("Binary operator not in OP_TO_BYTE map, using visitChildren");
    }
    
    console.log("Using visitChildren for expression");
    return this.visitChildren(ctx);
  }

  visitBlock_expr(ctx: Block_exprContext): Item {
    console.log("Visiting block expression:", ctx.getText());
    
    // Create new frame for the block scope
    const blockScope = new Frame();
    this.frames.push(blockScope);
    
    const statements = ctx.stmt_list()?.stmt() || [];
    const numStatements = statements.length;
    console.log(`Block has ${numStatements} statements`);
    
    // Process all statements in the block
    for (let i = 0; i < numStatements; i++) {
      const stmt = statements[i];
      const isLast = i === numStatements - 1;
      
      // Special handling for the last statement if it's an expression statement
      if (isLast && stmt instanceof Expr_stmtContext) {
        console.log("Last statement is an expression statement");
        // For the last expr statement, we want to keep its value
        const expr = stmt.expr();
        this.visit(expr);
        
        // Don't add POP here - we want to keep the result on the stack
        console.log("Keeping value of last expression");
      } else {
        // Normal processing for all other statements
        this.visit(stmt);
      }
    }
    
    // If the block has no statements or no expression statement at the end,
    // push a UNIT value to represent empty block result
    if (numStatements === 0 || !(statements[numStatements - 1] instanceof Expr_stmtContext)) {
      console.log("Adding UNIT value (0) for block with no tail expression");
      this.instructions.push(new Inst(Bytecode.LDCI, 0)); // Use 0 as UNIT value
    }
    
    // Remove the frame after processing
    this.frames.pop();
    
    return this.defaultResult();
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
    try {
      console.log("Visiting function call:", ctx.getText());
      
      // Visit the function expression first
      console.log("Processing function name:", ctx.expr().getText());
      this.visit(ctx.expr());
      console.log("Instructions after function name:", this.instructions.length);

      // Count arguments
      const numArgs = ctx.arg_list_opt() && ctx.arg_list_opt().expr() 
        ? ctx.arg_list_opt().expr().length 
        : 0;
      console.log("Number of arguments:", numArgs);

      // Visit all arguments
      if (ctx.arg_list_opt() && ctx.arg_list_opt().expr()) {
        const args = ctx.arg_list_opt().expr();
        for (let i = 0; i < args.length; i++) {
          console.log(`Processing argument ${i}:`, args[i].getText());
          this.visit(args[i]);
          console.log(`Instructions after argument ${i}:`, this.instructions.length);
        }
      }

      // Call the function with the number of arguments
      this.instructions.push(new Inst(Bytecode.CALL, numArgs));
      console.log(`Added CALL instruction with ${numArgs} arguments`);

      // The result of the function call will be left on the stack by the VM
      console.log("Function call completed, instruction count:", this.instructions.length);
      return this.defaultResult();
    } catch (error) {
      console.error("Error in function call:", error);
      throw error;
    }
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

  // Helper method to visit child of any context
  // This is needed because some grammar rules might place expressions directly in the parse tree
  visitChild(child: any): Item {
    console.log("Visiting child of type:", child.constructor.name);
    
    // Handle block expressions directly
    if (child instanceof Block_exprContext) {
      console.log("Direct block expression:", child.getText());
      return this.visit(child);
    }
    
    // Handle block statements directly
    if (child instanceof Block_stmtContext) {
      console.log("Direct block statement:", child.getText());
      return this.visit(child);
    }
    
    // Handle binary operations directly
    if (child instanceof BinaryOpExprContext) {
      console.log("Direct binary operation:", child.getText());
      return this.visitBinaryOpExpr(child);
    }
    
    // Handle expressions directly
    if (child instanceof ExprContext) {
      console.log("Direct expression:", child.getText());
      return this.visit(child);
    }
    
    // Handle expression statements directly
    if (child instanceof Expr_stmtContext) {
      console.log("Direct expression statement:", child.getText());
      return this.visit(child);
    }
    
    // Handle function calls directly
    if (child instanceof CallExprContext) {
      console.log("Direct function call:", child.getText());
      return this.visit(child);
    }
    
    // For other child types, use the normal visit method
    try {
      return this.visit(child);
    } catch (error) {
      console.error("Error visiting child:", child.constructor.name, child.getText?.() || "no getText", error);
      throw error;
    }
  }

  // Process text directly as an expression when normal parsing fails
  processDirectExpression(exprText: string): void {
    console.log("Processing direct expression:", exprText);
    
    // Handle simple binary addition expression: "a + b"
    const addMatch = exprText.match(/^(\w+)\s*\+\s*(\w+)$/);
    if (addMatch) {
      const [_, lhs, rhs] = addMatch;
      console.log(`Processing direct addition: ${lhs} + ${rhs}`);
      
      // Try to handle the operands
      if (!isNaN(Number(lhs))) {
        // Left hand side is a number
        this.instructions.push(new Inst(Bytecode.LDCI, parseInt(lhs, 10)));
      } else {
        // Left hand side is an identifier
        this.instructions.push(new Inst(Bytecode.LDHS, lhs));
      }
      
      if (!isNaN(Number(rhs))) {
        // Right hand side is a number
        this.instructions.push(new Inst(Bytecode.LDCI, parseInt(rhs, 10)));
      } else {
        // Right hand side is an identifier
        this.instructions.push(new Inst(Bytecode.LDHS, rhs));
      }
      
      // Add the plus instruction
      this.instructions.push(new Inst(Bytecode.PLUS));
      return;
    }
    
    // Handle simple function call: "func(a, b)"
    const callMatch = exprText.match(/^(\w+)\((.*)\)$/);
    if (callMatch) {
      const [_, funcName, argsText] = callMatch;
      const args = argsText.split(',').map(arg => arg.trim());
      console.log(`Processing direct function call: ${funcName}(${args.join(', ')})`);
      
      // Load the function
      this.instructions.push(new Inst(Bytecode.LDHS, funcName));
      
      // Load arguments
      for (const arg of args) {
        if (!isNaN(Number(arg))) {
          // Argument is a number
          this.instructions.push(new Inst(Bytecode.LDCI, parseInt(arg, 10)));
        } else {
          // Argument is an identifier
          this.instructions.push(new Inst(Bytecode.LDHS, arg));
        }
      }
      
      // Call the function
      this.instructions.push(new Inst(Bytecode.CALL, args.length));
      return;
    }
    
    console.log("Unable to process direct expression, no pattern matched");
  }
}

export default RustLikeCompilerVisitor;
