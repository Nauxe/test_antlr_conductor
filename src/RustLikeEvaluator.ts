import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import { CharStream, CommonTokenStream, ParseTree, TokenStream } from "antlr4ng";
import { RustLikeLexer } from "./parser/grammar/RustLikeLexer";
import { RustLikeParser } from "./parser/grammar/RustLikeParser";
import { RustLikeCompilerVisitor } from "./RustLikeCompiler";
import { Bytecode, RustLikeVirtualMachine } from "./RustLikeVirtualMachine";
import { RustLikeTypeCheckerVisitor } from "./RustLikeTypeChecker";

export class RustLikeEvaluator extends BasicEvaluator {
  private executionCount = 0;
  private typeCheckerVisitor = new RustLikeTypeCheckerVisitor();
  private compilerVisitor = new RustLikeCompilerVisitor();
  private VM = new RustLikeVirtualMachine();
  private isDebug: boolean = true;

  constructor(conductor: IRunnerPlugin) {
    super(conductor);
  }

  async evaluateChunk(chunk: string): Promise<void> {
    this.executionCount++;
    let inputStream: CharStream;
    let lexer: RustLikeLexer;
    let tokenStream: TokenStream;
    let parser: RustLikeParser;
    let tree: ParseTree;

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

    // Conduct type checks
    try {
      this.typeCheckerVisitor.visit(tree);
    } catch (error) {
      // Handle errors and send them to the REPL
      this.conductor.sendOutput(`Type checker error: ${error instanceof Error ? error.message : String(error)}`);

    }

    // Compile
    try {
      this.compilerVisitor.visit(tree);
    } catch (error) {
      // Handle errors and send them to the REPL
      this.conductor.sendOutput(`Compile error: ${error instanceof Error ? error.message : String(error)}`);
    }

    if (this.isDebug)
      this.conductor.sendOutput(`Compiled instructions: \n${this.compilerVisitor.instructions.map(
        inst => `[${Bytecode[inst.opcode].padEnd(7)} ${inst.operand ?? ""}]\n`)
        }\n\n -------------------------- \n`);

    // Run instructions on the virtual machine
    let result: { value: string, debugTrace: string };
    try {
      result = this.VM.runInstrs(this.compilerVisitor.instructions, this.isDebug);
    } catch (error) {
      // Handle errors and send them to the REPL
      this.conductor.sendOutput(`Runtime error: ${error instanceof Error ? error.message : String(error)}`);

    }

    if (this.isDebug)
      this.conductor.sendOutput(`DEBUG:\n${result.debugTrace}\n\n -------------------------- \n`);

    // Send the result to the REPL
    this.conductor.sendOutput(`Result of expression: ${result.value}`);
  }
}
