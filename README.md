# RustLike Report
[BNF Specification](specification.md)

## Memory Management
Non-primitive types like Strings are stored on the heap. Data structures such as environment frames and closures are also heap allocated.

All items on the heap are represented by a tag, a size, and some data. As Rust's [std::String](https://doc.rust-lang.org/std/string/struct.String.html) is growable, this implementation lets us allocate strings larger than the size of a word. Environments are represented by data containing a pointer to the parent environment and the bindings in the environment. Closures are represented by a pointer to the function address (index of the compiled bytecode instruction where the function begins) and a pointer to the environment the closure was declared in.

## Closures 
Assume that no names are declared within closures themselves.
Heap allocated arguments to functions are always captured by move, there is no support for captures by mutable or immutable references. Closures don't contain any references to an environment due to this, since all heap allocated variables are moved. Primitives are copied.

## Variable bindings 
Variable bindings are found both in Environments stored on the heap and on Frames stored on the RTS. 
Variable bindings in Environments are heap allocated, whereas variable bindings on Frames are stack allocated.

- types
  - u32: stack allocated primitive 
  - boolean: stack allocated primitive 
  - function: stack allocated primitive 
  - String: heap allocated object

LDCC (Load constant closure) captures all external variables used, whereas CALL captures all parameters passed into the closure. Variables will be bound to arguments before external variables and move semantics follow this order.

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
