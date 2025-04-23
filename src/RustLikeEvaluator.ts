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

      this.conductor.sendOutput(`Parsed successfully.`);

      // Debug output for the AST
      if (this.isDebug) {
        this.conductor.sendOutput(`AST: ${tree.toStringTree(parser)}`);
      }
    } catch (error) {
      // Handle errors and send them to the REPL
      this.conductor.sendOutput(`Parse error: ${error instanceof Error ? error.message : String(error)}`);
      //return;
    }

    // Conduct type checks
    try {
      const typeChecker = new RustLikeTypeCheckerVisitor(this.isDebug);
      typeChecker.visit(tree);
      this.conductor.sendOutput(`Type checking passed.`);
    } catch (error) {
      // Handle errors and send them to the REPL
      this.conductor.sendOutput(`Type checker error:\n${error instanceof Error ? error.message : String(error)}\n\n -------------------------- \n`);
      //return;
    }

    // Compile
    try {
      this.compilerVisitor.instructions = []; // Reset instructions
      this.compilerVisitor.visit(tree);
      this.conductor.sendOutput(`Compilation successful.`);
    } catch (error) {
      // Handle errors and send them to the REPL
      this.conductor.sendOutput(`Compile error: ${error instanceof Error ? error.message : String(error)}`);
      //return;
    }

    if (this.isDebug) {
      this.conductor.sendOutput(`Compiled instructions: ${this.compilerVisitor.instructions.map(
        inst => `\n[${Bytecode[inst.opcode].padEnd(7)} ${inst.operand ?? ""}]`)
        }\n\n -------------------------- \n`);
    }

    // Run instructions on the virtual machine
    let result: { value: string, debugTrace: string };
    const debugTrace = { trc: "" };
    try {
      if (this.compilerVisitor.instructions.length === 0) {
        throw new Error("No instructions to execute");
      }
      result = this.VM.runInstrs(this.compilerVisitor.instructions, this.isDebug, debugTrace);

      if (this.isDebug)
        this.conductor.sendOutput(`DEBUG:\n${result.debugTrace}\n\n -------------------------- \n`);

      // Send the result to the REPL
      this.conductor.sendOutput(`Result of expression: ${result.value}`);
    } catch (error) {

      if (this.isDebug)
        this.conductor.sendOutput(`DEBUG:\n${debugTrace.trc}\n\n -------------------------- \n`);

      // Handle errors and send them to the REPL
      this.conductor.sendOutput(`Runtime error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
