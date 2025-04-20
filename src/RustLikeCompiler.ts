//import { Tag, HeapItem } from "./Heap";
import { Bytecode, Inst } from "./RustLikeVirtualMachine";
import { CharStream, CommonTokenStream, AbstractParseTreeVisitor } from 'antlr4ng';
import { ExpressionContext, ProgContext, RustLikeParser } from './parser/grammar/RustLikeParser';
import { RustLikeVisitor } from './parser/grammar/RustLikeVisitor';

export class RustLikeCompilerVisitor extends AbstractParseTreeVisitor<number> implements RustLikeVisitor<number> {
  // Visit a parse tree produced by RustLikeParser#prog
  visitProg(ctx: ProgContext): number {
    return this.visit(ctx.block());
  }

  // Visit a parse tree produced by RustLikeParser#expression
  visitExpression(ctx: ExpressionContext): number {
    if (ctx.getChildCount() === 1) {
      // INT case
      return parseInt(ctx.getText());
    } else if (ctx.getChildCount() === 3) {
      if (ctx.getChild(0).getText() === '(' && ctx.getChild(2).getText() === ')') {
        // Parenthesized expression
        return this.visit(ctx.getChild(1) as ExpressionContext);
      } else {
        // Binary operation
        const left = this.visit(ctx.getChild(0) as ExpressionContext);
        const op = ctx.getChild(1).getText();
        const right = this.visit(ctx.getChild(2) as ExpressionContext);

        switch (op) {
          case '+': return left + right;
          case '-': return left - right;
          case '*': return left * right;
          case '/':
            if (right === 0) {
              throw new Error("Division by zero");
            }
            return left / right;
          default:
            throw new Error(`Unknown operator: ${op}`);
        }
      }
    }

    throw new Error(`Invalid expression: ${ctx.getText()}`);
  }

  // Override the default result method from AbstractParseTreeVisitor
  protected defaultResult(): number {
    return 0;
  }
  // Override the aggregate result method
  protected aggregateResult(aggregate: number, nextResult: number): number {
    return nextResult;
  }
}

export class RustCompiler {
  private WC: number; // Write counter
  private instrs: Inst[];

  constructor() {
    this.WC = 0;
    this.instrs = [];
  }

  // TODO:
  scan_for_locals() {

  }

  // TODO:
  compile_sequence() {

  }

  //TODO: 
  compile_comp(comp) {
  }
}
