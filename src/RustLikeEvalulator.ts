import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import { CharStream, CommonTokenStream } from "antlr4ng";
import { RustLikeLexer } from "./parser/grammar/RustLikeLexer";
import { RustLikeParser } from "./parser/grammar/RustLikeParser";
import { RustLikeCompilerVisitor } from "./RustLikeCompiler";

export class RustLikeEvaluator extends BasicEvaluator {
  private executionCount = 0;
  private visitor = new RustLikeCompilerVisitor();

  constructor(conductor: IRunnerPlugin) {
    super(conductor);
  }

  async evaluateChunk(chunk: string): Promise<void> {
    this.executionCount++;
    try {
      const inputStream = CharStream.fromString(chunk);
      const lexer = new RustLikeLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new RustLikeParser(tokenStream);

      const tree = parser.prog();
      const result = this.visitor.visit(tree);

      this.conductor.sendOutput(`Result of expression: ${result}`);
    } catch (error) {
      this.conductor.sendOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
