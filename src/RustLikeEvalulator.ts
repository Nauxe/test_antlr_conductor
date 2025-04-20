import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import { CharStream, CommonTokenStream, AbstractParseTreeVisitor } from 'antlr4ng';
import { RustLikeLexer } from './parser/grammar/RustLikeLexer';
import { ExpressionContext, ProgContext, RustLikeParser } from './parser/grammar/RustLikeParser';
import { RustLikeCompilerVisitor } from "./RustLikeCompiler";

export class RustLikeEvaluator extends BasicEvaluator {
  private executionCount: number;
  private visitor: RustLikeCompilerVisitor;

  constructor(conductor: IRunnerPlugin) {
    super(conductor);
    this.executionCount = 0;
    this.visitor = new RustLikeCompilerVisitor();
  }

  async evaluateChunk(chunk: string): Promise<void> {
    this.executionCount++;
    try {
      // Create the lexer and parser
      const inputStream = CharStream.fromString(chunk);
      const lexer = new RustLikeLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new RustLikeParser(tokenStream);

      // Parse the input
      const tree = parser.prog();

      // Evaluate the parsed tree
      const result = this.visitor.visit(tree);

      // TODO: Conduct type checks here

      // TODO: Compile

      // TODO: Run bytecode on a virtual machine

      // Send the result to the REPL
      this.conductor.sendOutput(`Result of expression: ${result}`);
    } catch (error) {
      // Handle errors and send them to the REPL
      if (error instanceof Error) {
        this.conductor.sendOutput(`Error: ${error.message}`);
      } else {
        this.conductor.sendOutput(`Error: ${String(error)}`);
      }
    }
  }
}
