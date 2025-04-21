# RustLike Report
[BNF Specification](specification.md)

## Memory Management
Non-primitive types like Strings are stored on the heap. Data structures such as environment frames and closures are also heap allocated.

All items on the heap are represented by a tag, a size, and some data. As Rust's [std::String](https://doc.rust-lang.org/std/string/struct.String.html) is growable, this implementation lets us allocate strings larger than the size of a word. Environments are represented by data containing a pointer to the parent environment and the bindings in the environment. 

Closures are represented by a pointer to the function address (index of the compiled bytecode instruction where the function begins) and the variables that appear in the function body, either as captured variables or as parameters to the function. Closures are stack allocated.

Closures will always have a return value. If nothing is returned, a value of type Unit will be returned.

## Closures 
Assume that no names are declared within closures themselves.
Heap allocated arguments to functions are always captured by move, there is no support for captures by mutable or immutable references. Closures don't contain any references to an environment due to this, since all heap allocated variables are moved. Primitives are copied. Calling a closure automatically enters the scope of the closure and no ENTER_SCOPE instruction needs to follow.

Closures live on the operand stack, in the runtime stack, or inside other closures' captured variables map. Closures can reference heap allocated values via variable capture, closures are a runtime structure that are owned by the virtual machine.

Closures are not serializable into the heap, so closure in closure captures are done as follows: 

## Variable bindings 
Variable bindings are found both in Environments stored on the heap and on Frames stored on the RTS. 
Variable bindings in Environments are heap allocated, whereas variable bindings on Frames are stack allocated.

- types
  - u32: primitive, stored in environments as literal values 
  - boolean: primitive, stored in environments as literal values 
  - unit: primitive, not stored anywhere, can only be a possible function result and cannot be assigned to anything or used for anything 
  - function: stack allocated primitive, stored in OS or RTS 
  - String: heap allocated object

LDCC (Load constant closure) captures all external variables used, whereas CALL captures all parameters passed into the closure. Variables will be bound to arguments before external variables and move semantics follow this order.

## The Compiler Pipeline

The *RustLike Compiler* is a single‑pass **visitor** that walks the parse‑tree produced by ANTLR and **directly emits byte‑code** for the virtual machine.  
Because the VM is stack‑based, every visitor method follows the same simple rule:

> *“Leave the value of the sub‑expression you just compiled on the operand stack.”*

Below is the complete journey from source code to running program.

| Phase | What Happens | Important Files |
|-------|--------------|-----------------|
| **1. Lex / Parse** | The grammar in `parser/grammar/RustLike.g4` is fed to **ANTLR 4**, generating `RustLikeLexer.ts`, `RustLikeParser.ts`, and the visitor/ listener bases. | `grammar/RustLike.g4` |
| **2. AST Visiting** | `RustLikeCompilerVisitor.ts` extends `AbstractParseTreeVisitor`. It overrides only the rules we care about (e.g. `print_stmt`, `while_loop`, `BinaryOpExprContext`). Each override emits one or more `Inst` objects and pushes them onto an in‑memory `instructions` array. | `src/RustLikeCompiler.ts` |
| **3. Byte‑code Emission** | An `Inst` is just `{ opcode: Bytecode, operand?: any }`.  *Literals* become `LDCI/LDCB/LDCS`; *variables* use `LDHS`; arithmetic is `PLUS` / `TIMES`; control‑flow is `JOF`, `GOTO`, etc. No optimisation passes are performed – the output order directly mirrors the parse‑tree traversal. | `src/RustLikeVirtualMachine.ts` (enum `Bytecode`) |
| **4. Execution** | The array of `Inst` objects is handed to `RustLikeVirtualMachine.runInstrs()`. The VM executes a fetch‑decode‑execute loop (`step()`), manipulating:<br>• **OS** – operand stack<br>• **RTS** – runtime‑stack of call frames / primitives<br>• **E** – current heap‑environment pointer<br>• **Heap** – growable arena for strings, closures, environments | `src/RustLikeVirtualMachine.ts` |
| **5. Result** | When the VM reaches `Bytecode.DONE`, it pops the final `Item` from the OS, converts it back to a JavaScript value (using tag info + heap look‑ups) and returns it to the host. |

### A Walk‑through Example

```rust
print(3 + 4);
```

1. **Parsing** produces a tree where `print_stmt` → `expr` → `binaryOpExpr( INT_OP '+' )`.
2. The visitor emits:

   | Instruction | Stack Effect |
   |-------------|--------------|
   | `LDCI 3`    | push **3** |
   | `LDCI 4`    | push **4** |
   | `PLUS`      | pop 4,3 → push **7** |
   | `LDPS "println!"` | push the built‑in print closure |
   | `CALL`      | pop closure & arg, execute host print |
   | `DONE`      | halt |

3. The VM’s built‑in `println!` closure ultimately calls `console.log`, so **7** is printed.

### Design Choices

* **Single pass, visitor‑only** – keeps the compiler tiny and easy to extend; adding a new language feature is usually one new visitor override and (maybe) a new byte‑code.
* **Stack machine** – matches ANTLR’s natural DFS traversal and avoids register allocation.
* **Heap vs RTS** – mirrors Rust’s “stack vs heap” split; primitives live on frames, growable or shared data live in the heap and are moved into closures.



---
# using ANTLR with "SourceAcademy Conductor"

## starting point:
Refer to Sam's repository: https://github.com/tsammeow/conductor-runner-example
I have forked it and made some configuartion changes to make it work with ANTLR.

## define your grammar
create a file (say, grammar/SimpleLang.g4) with something like:
```antlr
grammar SimpleLang;

prog: expression EOF;

expression
    : expression op=('+'|'-') expression
    | expression op=('*'|'/') expression
    | INT
    | '(' expression ')'
    ;

INT: [0-9]+;
WS: [ \t\r\n]+ -> skip;
```

## generate parser & visitor
this repository is already configured to generate the parser and visitor from your grammar. just run:

```bash
yarn generate-parser
```
this spits out your lexer, parser, and a visitor in src/parser/src.

## implement your evaluator with a visitor
create a new file (e.g. src/SimpleLangEvaluator.ts) that uses the generated parser. for example:
```typescript
import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import { CharStream, CommonTokenStream, AbstractParseTreeVisitor } from 'antlr4ng';
import { SimpleLangLexer } from './parser/src/SimpleLangLexer';
import { ExpressionContext, ProgContext, SimpleLangParser } from './parser/src/SimpleLangParser';
import { SimpleLangVisitor } from './parser/src/SimpleLangVisitor';

class SimpleLangEvaluatorVisitor extends AbstractParseTreeVisitor<number> implements SimpleLangVisitor<number> {
    // Visit a parse tree produced by SimpleLangParser#prog
    visitProg(ctx: ProgContext): number {
        return this.visit(ctx.expression());
    }

    // Visit a parse tree produced by SimpleLangParser#expression
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

export class SimpleLangEvaluator extends BasicEvaluator {
    private executionCount: number;
    private visitor: SimpleLangEvaluatorVisitor;

    constructor(conductor: IRunnerPlugin) {
        super(conductor);
        this.executionCount = 0;
        this.visitor = new SimpleLangEvaluatorVisitor();
    }

    async evaluateChunk(chunk: string): Promise<void> {
        this.executionCount++;
        try {
            // Create the lexer and parser
            const inputStream = CharStream.fromString(chunk);
            const lexer = new SimpleLangLexer(inputStream);
            const tokenStream = new CommonTokenStream(lexer);
            const parser = new SimpleLangParser(tokenStream);
            
            // Parse the input
            const tree = parser.prog();
            
            // Evaluate the parsed tree
            const result = this.visitor.visit(tree);
            
            // Send the result to the REPL
            this.conductor.sendOutput(`Result of expression: ${result}`);
        }  catch (error) {
            // Handle errors and send them to the REPL
            if (error instanceof Error) {
                this.conductor.sendOutput(`Error: ${error.message}`);
            } else {
                this.conductor.sendOutput(`Error: ${String(error)}`);
            }
        }
    }
}
```

## update your entry point
change src/index.ts to import your new evaluator:
```typescript
import { initialise } from "conductor/dist/conductor/runner/util/";
import { SimpleLangEvaluator } from "./SimpleLangEvaluator";

const { runnerPlugin, conduit } = initialise(SimpleLangEvaluator);
```

## bundle into a single js file
your rollup config (in rollup.config.js) already uses src/index.ts as entry, so just run:
```bash
yarn build
```
this produces a bundled file at dist/index.js that’s fully conductor-compatible.

## load your evaluator into sourceacademy playground 
run yarn build. if there are no problems, a file dist/index.js will be generated. this is the file that will be used to run your implementation of the language.

this repository has been configured to automatically build your runner and deploy it to github pages upon pushing to the main branch on github. you should be able to find it at https://{your-username}.github.io/{your-repository}/index.js.

enjoy!
