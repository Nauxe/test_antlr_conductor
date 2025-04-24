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

  // Helper function to print AST structure
  private printTree(node: any, indent: number): string {
    let result = '';
    const indentStr = ' '.repeat(indent * 2);
    result += `${indentStr}+ ${node.constructor.name}\n`;
    
    try {
      for (let i = 0; i < node.getChildCount(); i++) {
        const child = node.getChild(i);
        result += `${indentStr}  Child ${i}: ${child.constructor.name} - "${child.getText()}"\n`;
        result += this.printTree(child, indent + 1);
      }
    } catch (e) {
      result += `${indentStr}  (Error printing children: ${e})\n`;
    }
    
    return result;
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
        
        // Print detailed AST structure
        const treeStructure = this.printTree(tree, 0);
        this.conductor.sendOutput(`\nDetailed AST Structure:\n${treeStructure}`);
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
      this.conductor.sendOutput(`\nStarting compilation...`);
      this.compilerVisitor.visit(tree);
      this.conductor.sendOutput(`\nCompilation successful.`);
    } catch (error) {
      // Handle errors and send them to the REPL
      this.conductor.sendOutput(`Compile error: ${error instanceof Error ? error.message : String(error)}`);
      //return;
    }

    if (this.isDebug) {
      if (this.compilerVisitor.instructions.length > 1) {
        const instructionList = this.compilerVisitor.instructions.map(
          (inst, index) => `\n[${index}: ${Bytecode[inst.opcode].padEnd(7)} ${inst.operand !== undefined ? JSON.stringify(inst.operand) : ""}]`
        ).join('');
        this.conductor.sendOutput(`Compiled instructions: ${instructionList}\n\n -------------------------- \n`);
      } else {
        this.conductor.sendOutput(`Compiled instructions: ${this.compilerVisitor.instructions.map(
          (inst, index) => `\n[${index}: ${Bytecode[inst.opcode].padEnd(7)} ${inst.operand !== undefined ? JSON.stringify(inst.operand) : ""}]`
        ).join('')}\n\n -------------------------- \n`);
        
        this.conductor.sendOutput(`\nWARNING: Only ${this.compilerVisitor.instructions.length} instruction was generated! This is likely a bug in the compiler.`);
      }
    }

    // Run instructions on the virtual machine
    let result: { value: string, debugTrace: string };
    const debugTrace = { trc: "" };
    
    try {
      if (this.compilerVisitor.instructions.length === 0) {
        throw new Error("No instructions to execute");
      }
      
      // Print information about the number of instructions being executed
      if (this.isDebug) {
        this.conductor.sendOutput(`Executing ${this.compilerVisitor.instructions.length} instructions\n`);
      }
      
      result = this.VM.runInstrs(this.compilerVisitor.instructions, this.isDebug, debugTrace);

      if (this.isDebug) {
        this.conductor.sendOutput(`DEBUG:\n${result.debugTrace}\n\n -------------------------- \n`);
      }

      // Send the result to the REPL
      this.conductor.sendOutput(`Result of expression: ${result.value}`);
    } catch (error) {
      if (this.isDebug) {
        this.conductor.sendOutput(`DEBUG:\n${debugTrace.trc}\n\n -------------------------- \n`);
      }

      // Handle errors and send them to the REPL
      this.conductor.sendOutput(`Runtime error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
