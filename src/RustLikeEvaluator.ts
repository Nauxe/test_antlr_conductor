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
    let inputStream;
    let lexer;
    let tokenStream;
    let parser;
    let tree;
    let visitorResult;
    let result;

    try {
      // Create the lexer and parser
      inputStream = CharStream.fromString(chunk);
      lexer = new RustLikeLexer(inputStream);
      tokenStream = new CommonTokenStream(lexer);
      parser = new RustLikeParser(tokenStream);

      // Parse the input
      tree = parser.prog();
    } catch (error) {
      // Handle errors and send them to the REPL
      this.conductor.sendOutput(`Parse error: ${error instanceof Error ? error.message : String(error)}`);
    }


    // TODO: Conduct type checks

    // Compile
    try {
      visitorResult = this.visitor.visit(tree);
    } catch (error) {
      // Handle errors and send them to the REPL
      this.conductor.sendOutput(`Compile error: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Run instructions on the virtual machine
    try {
      result = this.VM.runInstrs(this.visitor.instructions);
    } catch (error) {
      // Handle errors and send them to the REPL
      this.conductor.sendOutput(`Runtime error: ${error instanceof Error ? error.message : String(error)}`);

    }
    // Send the result to the REPL
    this.conductor.sendOutput(`Result of expression: ${result}`);
  }
}
