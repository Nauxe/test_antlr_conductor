import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import { CharStream, CommonTokenStream } from "antlr4ng";
import { RustLikeLexer } from "./parser/grammar/RustLikeLexer";
import { RustLikeParser } from "./parser/grammar/RustLikeParser";
import { RustLikeCompilerVisitor } from "./RustLikeCompiler";
import { RustLikeVirtualMachine } from "./RustLikeVirtualMachine";

export class RustLikeEvaluator extends BasicEvaluator {
  private executionCount = 0;
  private visitor = new RustLikeCompilerVisitor();
  private VM = new RustLikeVirtualMachine();

  constructor(conductor: IRunnerPlugin) {
    super(conductor);
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

      // TODO: Conduct type checks

      // Compile
      const visitorResult = this.visitor.visit(tree);

      // Run bytecode on the virtual machine
      const result = this.VM.runInstrs(this.visitor.instructions);

      // Send the result to the REPL
      this.conductor.sendOutput(`Result of expression: ${result}`);
    } catch (error) {
      // Handle errors and send them to the REPL
      this.conductor.sendOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
