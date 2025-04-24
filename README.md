# RustLike Language Implementation

## Project Team
- Student Name: [Your Name]
- Student Number: [Your Student Number]

## Project Title
Implementation of a RustLike Programming Language with ANTLR4, TypeScript, and a Virtual Machine

## Repository URL
[https://github.com/nauxe/test_antlr_conductor](https://github.com/nauxe/test_antlr_conductor)

## Project Scope and Objectives

This project implements a small programming language inspired by Rust, providing fundamental programming constructs with a focus on type safety and memory management. The language is implemented using a compiler pipeline that includes lexical analysis, parsing, type checking, and execution on a custom virtual machine.

### T-Diagrams of Language Processing Steps

```
┌───────────────────┐
│ RustLike Source   │
│ Code (*.rustlike) │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  ANTLR4 Lexer/    │
│  Parser (RustLike │
│  Grammar)         │
└─────────┬─────────┘
          │ AST
          ▼
┌───────────────────┐
│  Type Checker     │
│  Visitor          │
└─────────┬─────────┘
          │ Typed AST
          ▼
┌───────────────────┐
│  Compiler Visitor │
│  (Bytecode Gen)   │
└─────────┬─────────┘
          │ Bytecode Instructions
          ▼
┌───────────────────┐
│  RustLike Virtual │
│  Machine          │
└─────────┬─────────┘
          │ Execution Results
          ▼
┌───────────────────┐
│  Program Output   │
└───────────────────┘
```

### Language Specification

The RustLike language implements a subset of Rust-like features:

#### Lexical Elements
- Keywords: `let`, `fn`, `if`, `else`, `while`, `break`, `continue`, `print!`, `true`, `false`
- Types: `u32`, `bool`, `string`, `fn`, `()`
- Operators: `+`, `-`, `*`, `/`, `==`, `!=`, `<`, `<=`, `>`, `>=`, `&&`, `||`, `!`
- Literals: integer literals, string literals, boolean literals

#### Grammar (BNF)

```
prog        ::= stmt_list EOF
stmt_list   ::= stmt+
stmt        ::= decl | fn_decl | print_stmt | if_stmt | while_loop | 
                break_stmt | continue_stmt | expr_stmt | block_stmt
decl        ::= 'let' IDENTIFIER ':' type '=' expr ';'
fn_decl     ::= 'fn' IDENTIFIER '(' param_list_opt ')' '->' type (block_stmt | block_expr)
param_list  ::= param (',' param)*
param       ::= IDENTIFIER ':' type

print_stmt  ::= 'print!' '(' expr ')' ';'
break_stmt  ::= 'break' ';'
continue_stmt ::= 'continue' ';'
expr_stmt   ::= expr ';'
if_stmt     ::= 'if' expr block_stmt ('else' block_stmt)?
while_loop  ::= 'while' expr block_stmt

block_stmt  ::= '{' stmt_list '}'
block_expr  ::= '{' stmt_list expr '}'

expr        ::= unary_expr | binary_expr | call_expr | index_expr | primary
primary     ::= literal | IDENTIFIER | '(' expr ')' | if_expr | 
                array_literal | tuple_expr | range_expr | block_expr
```

## Memory Management System

Non-primitive types like Strings are stored on the heap. Data structures such as environment frames and closures are also heap allocated.

All items on the heap are represented by a tag, a size, and some data. As Rust's [std::String](https://doc.rust-lang.org/std/string/struct.String.html) is growable, this implementation lets us allocate strings larger than the size of a word. Environments are represented by data containing a pointer to the parent environment and the bindings in the environment.

Closures are represented by a pointer to the function address (index of the compiled bytecode instruction where the function begins) and the variables that appear in the function body, either as captured variables or as parameters to the function. Closures are stack allocated.

Closures will always have a return value. If nothing is returned, a value of type Unit will be returned.

### Variable Bindings and Types

Variable bindings are found both in Environments stored on the heap and on Frames stored on the RTS (Runtime Stack). 
Variable bindings in Environments are heap allocated, whereas variable bindings on Frames are stack allocated.

The RustLike type system includes:
- **u32**: primitive, stored in environments as literal values 
- **boolean**: primitive, stored in environments as literal values 
- **unit**: primitive, not stored anywhere, can only be a possible function result and cannot be assigned to anything or used for anything 
- **function**: stack allocated primitive, stored in OS or RTS 
- **String**: heap allocated object

### Closures

Heap allocated arguments to functions are always captured by move, there is no support for captures by mutable or immutable references. Closures don't contain any references to an environment due to this, since all heap allocated variables are moved. Primitives are copied. Calling a closure automatically enters the scope of the closure and no ENTER_SCOPE instruction needs to follow.

Closures live on the operand stack, in the runtime stack, or inside other closures' captured variables map. Closures can reference heap allocated values via variable capture, closures are a runtime structure that are owned by the virtual machine.

Closures are not serializable into the heap, so closure-in-closure captures are done by copying bindings of closures found on the runtime stack into a new stack frame pushed via a function call. This is done in the CALL instruction.

LDCC (Load constant closure) captures all external variables used, whereas CALL captures all parameters passed into the closure. Variables will be bound to arguments before external variables and move semantics follow this order.

## The Compiler Pipeline

The *RustLike Compiler* is a single‑pass **visitor** that walks the parse‑tree produced by ANTLR and **directly emits byte‑code** for the virtual machine.  
Because the VM is stack‑based, every visitor method follows the same simple rule:

> *"Leave the value of the sub‑expression you just compiled on the operand stack."*

Below is the complete journey from source code to running program.

| Phase | What Happens | Important Files |
|-------|--------------|-----------------|
| **1. Lex / Parse** | The grammar in `parser/grammar/RustLike.g4` is fed to **ANTLR 4**, generating `RustLikeLexer.ts`, `RustLikeParser.ts`, and the visitor/ listener bases. | `grammar/RustLike.g4` |
| **2. AST Visiting** | `RustLikeCompilerVisitor.ts` extends `AbstractParseTreeVisitor`. It overrides only the rules we care about (e.g. `print_stmt`, `while_loop`, `BinaryOpExprContext`). Each override emits one or more `Inst` objects and pushes them onto an in‑memory `instructions` array. | `src/RustLikeCompiler.ts` |
| **3. Byte‑code Emission** | An `Inst` is just `{ opcode: Bytecode, operand?: any }`.  *Literals* become `LDCI/LDCB/LDCS`; *variables* use `LDHS`; arithmetic is `PLUS` / `TIMES`; control‑flow is `JOF`, `GOTO`, etc. No optimisation passes are performed – the output order directly mirrors the parse‑tree traversal. | `src/RustLikeVirtualMachine.ts` (enum `Bytecode`) |
| **4. Execution** | The array of `Inst` objects is handed to `RustLikeVirtualMachine.runInstrs()`. The VM executes a fetch‑decode‑execute loop (`step()`), manipulating:<br>• **OS** – operand stack<br>• **RTS** – runtime‑stack of call frames / primitives<br>• **E** – current heap‑environment pointer<br>• **Heap** – growable arena for strings, closures, environments | `src/RustLikeVirtualMachine.ts` |
| **5. Result** | When the VM reaches `Bytecode.DONE`, it pops the final `Item` from the OS, converts it back to a JavaScript value (using tag info + heap look‑ups) and returns it to the host. |

### Virtual Machine Architecture

The RustLike VM is a stack-based machine with the following components:

1. **Instruction Set** - Key bytecodes include:
   - `LDCI`, `LDCB`, `LDCS`: Load constants (integer, boolean, string)
   - `PLUS`, `TIMES`, `LT`, `EQ`: Arithmetic and comparison operations
   - `JOF`, `GOTO`: Control flow instructions
   - `CALL`, `RET`: Function call mechanisms
   - `ENTER_SCOPE`, `EXIT_SCOPE`: Scope management
   - `NEW_ARRAY`, `NEW_TUPLE`, `NEW_RANGE`: Compound data structure creation
   - `INDEX`, `REF`, `DEREF`: Memory operations

2. **Registers**:
   - **OS**: Operand Stack - holds intermediate values during computation
   - **PC**: Program Counter - points to the current instruction
   - **E**: Environment Pointer - points to current environment frame on heap
   - **RTS**: Runtime Stack - holds call frames and return addresses

3. **Memory Model**:
   - Stack-based execution model
   - Heap for dynamically allocated objects (strings, environments)
   - Frame-based scope management

### Type Checker Implementation

The type checker is implemented as a visitor (`RustLikeTypeCheckerVisitor`) that traverses the AST to verify type correctness. It maintains a type environment that maps variable names to their types, and it verifies that:

1. Variables are declared before use
2. Operation operands have compatible types
3. Function calls have the correct number and types of arguments
4. Control flow statements have appropriate condition types
5. Functions return values of the declared return type

The type system supports:
- Basic types (u32, bool, string, unit)
- Function types with parameter and return type information
- Reference types
- Structural compatibility checking

### A Walk‑through Example

```rust
print!(3 + 4);
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

3. The VM's built‑in `println!` closure ultimately calls `console.log`, so **7** is printed.

### Design Choices

* **Single pass, visitor‑only** – keeps the compiler tiny and easy to extend; adding a new language feature is usually one new visitor override and (maybe) a new byte‑code.
* **Stack machine** – matches ANTLR's natural DFS traversal and avoids register allocation.
* **Heap vs RTS** – mirrors Rust's "stack vs heap" split; primitives live on frames, growable or shared data live in the heap and are moved into closures.

## System Build and Run Instructions

### Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)

### Build Instructions

1. Clone the repository:
   ```
   git clone https://github.com/nauxe/test_antlr_conductor.git
   cd test_antlr_conductor
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Generate the parser from the grammar:
   ```
   npm run antlr
   ```

4. Compile TypeScript files:
   ```
   npm run build
   ```

### Running the Compiler and VM

To run a RustLike program:

```
npm run exec -- path/to/your/program.rs
```

To start an interactive REPL:

```
npm run repl
```

## Test Cases

The following test cases demonstrate the key features of the RustLike language:

### Test Case 1: Basic Arithmetic
```rust
{
  let x: u32 = 5;
  let y: u32 = 10;
  x + y;
}
```
Expected output: `15`

### Test Case 2: Conditionals
```rust
{
  let x: u32 = 10;
  if x > 5 {
    x + 5
  } else {
    x - 5
  }
}
```
Expected output: `15`

### Test Case 3: Functions
```rust
fn add(a: u32, b: u32) -> u32 {
  a + b
}

{
  add(3, 4)
}
```
Expected output: `7`

### Test Case 4: Loops
```rust
{
  let sum: u32 = 0;
  let i: u32 = 0;
  while i < 5 {
    sum = sum + i;
    i = i + 1;
  }
  sum
}
```
Expected output: `10`

### Test Case 5: Arrays
```rust
{
  let arr = [1, 2, 3, 4, 5];
  arr[2] + arr[3]
}
```
Expected output: `7`

### Test Case 6: Strings
```rust
{
  let greeting: string = "Hello, ";
  let name: string = "World!";
  print!(greeting + name);
}
```
Expected output: `Hello, World!`

### Test Case 7: Boolean Logic
```rust
{
  let a: bool = true;
  let b: bool = false;
  a && (b || !b)
}
```
Expected output: `true`

### Test Case 8: Nested Blocks
```rust
{
  let x: u32 = 5;
  {
    let y: u32 = 10;
    x + y
  }
}
```
Expected output: `15`

### Test Case 9: References
```rust
{
  let x: u32 = 42;
  let r: &u32 = &x;
  *r
}
```
Expected output: `42`

### Test Case 10: Ranges
```rust
{
  let r = 1..5;
  r[2]
}
```
Expected output: `3`

## Project Structure

The system is organized into several components:

- **Grammar Definition**: `grammar/RustLike.g4`
- **Lexer/Parser**: Generated in `src/parser/`
- **Compiler**: `src/RustLikeCompiler.ts`
- **Type Checker**: `src/RustLikeTypeChecker.ts`
- **Virtual Machine**: `src/RustLikeVirtualMachine.ts`
- **Memory Management**: `src/Heap.ts`
- **Main Evaluator**: `src/RustLikeEvaluator.ts`
- **Tests**: `src/test.ts`

## Future Improvements

Potential enhancements for this language implementation:

1. Enhanced error reporting with line and column information
2. More advanced memory management features
3. Optimization of bytecode generation
4. Support for additional data structures
5. Standard library implementation
6. Closures and higher-order functions
7. Module system for code organization

## Conclusion

This project demonstrates a complete implementation of a Rust-inspired programming language with a focus on static typing and memory safety. The implementation leverages modern compiler construction techniques with a multi-phase pipeline from source code to execution. The language features a clean syntax inspired by Rust while being simpler to implement and understand.
