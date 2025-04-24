# RustLike Language Specification

## 1. Introduction

RustLike is a small, statically-typed programming language inspired by Rust, designed to demonstrate key language implementation concepts including lexical analysis, parsing, type checking, and execution on a virtual machine. This language incorporates fundamental features of Rust including its syntax, type system, and memory ownership model while simplifying many aspects to make it more approachable for educational purposes.

## 2. Lexical Structure

### 2.1 Keywords

The following are reserved keywords in RustLike:

```
let       fn        if        else      while
break     continue  return    true      false
print!
```

### 2.2 Literals

- **Integer literals**: Sequences of decimal digits (e.g., `42`)
- **String literals**: Sequences of characters enclosed in double quotes (e.g., `"hello"`)
- **Boolean literals**: `true` or `false`

### 2.3 Operators

- **Arithmetic**: `+`, `-`, `*`, `/`
- **Comparison**: `==`, `!=`, `<`, `<=`, `>`, `>=`
- **Logical**: `&&`, `||`, `!`
- **Reference**: `&` (reference creation), `*` (dereference)
- **Range**: `..` (creates a range from start to end)
- **Index**: `[]` (array/string indexing)

### 2.4 Delimiters

- **Parentheses**: `(` and `)` for grouping and function calls
- **Braces**: `{` and `}` for blocks and function bodies
- **Brackets**: `[` and `]` for array literals and indexing
- **Semicolon**: `;` terminates statements
- **Comma**: `,` separates elements in lists

### 2.5 Identifiers

Identifiers begin with a letter and can contain additional letters.

## 3. Types

### 3.1 Primitive Types

- **u32**: 32-bit unsigned integer
- **bool**: Boolean value (`true` or `false`)
- **string**: Text string
- **()**: Unit type (represents the absence of a value)

### 3.2 Compound Types

- **Arrays**: Fixed-size collection of elements with the same type
- **Tuples**: Fixed-size collection of elements with potentially different types
- **Ranges**: Represents a sequence of integers from start to end

### 3.3 Reference Types

- **&T**: Reference to a value of type T

### 3.4 Function Types

- **fn(T1, T2, ...) -> R**: Function taking arguments of types T1, T2, etc., returning a value of type R

## 4. Grammar (BNF)

```
prog        ::= stmt_list EOF
stmt_list   ::= stmt+
stmt        ::= decl | fn_decl | print_stmt | if_stmt | while_loop | 
                break_stmt | continue_stmt | expr_stmt | block_stmt
decl        ::= 'let' IDENTIFIER ':' type '=' expr ';'
fn_decl     ::= 'fn' IDENTIFIER '(' param_list_opt ')' '->' type (block_stmt | block_expr)
param_list_opt ::= /* empty */ | param_list
param_list  ::= param (',' param)*
param       ::= IDENTIFIER ':' type

print_stmt      ::= 'print!' '(' expr ')' ';'
break_stmt      ::= 'break' ';'
continue_stmt   ::= 'continue' ';'
expr_stmt       ::= expr ';'
if_stmt         ::= 'if' expr block_stmt ('else' block_stmt)?
while_loop      ::= 'while' expr block_stmt

block_stmt      ::= '{' stmt_list '}'
block_expr      ::= '{' stmt_list expr '}'

expr        ::= BOOL_OP expr                               # unaryExpr
              | '&' expr                                   # refExpr
              | '*' expr                                   # derefExpr
              | expr '[' expr ']'                          # indexExpr
              | expr '(' arg_list_opt ')'                  # callExpr
              | expr INT_OP expr                           # binaryOpExpr
              | expr BOOL_BINOP expr                       # logicalExpr
              | primary                                    # primaryExpr

primary     ::= u32_expr | str_expr | bool_expr
              | IDENTIFIER
              | '(' expr ')'
              | if_expr
              | array_literal
              | tuple_expr
              | range_expr
              | block_expr

arg_list_opt    ::= /* empty */ | expr (',' expr)*
if_expr         ::= 'if' expr block_expr ('else' block_expr)?
array_literal   ::= '[' (expr (',' expr)*)? ']'
tuple_expr      ::= '(' (expr (',' expr)*)? ')'
range_expr      ::= u32_expr '..' u32_expr

u32_expr        ::= U32
str_expr        ::= STRING ('+' STRING)?
bool_expr       ::= BOOL

type        ::= '()'                     # unit type
              | 'u32'                    # u32 type
              | 'bool'                   # boolean type
              | 'string'                 # string type
              | '&' type                 # reference type
              | 'fn' '(' type_list_opt ')' '->' type  # function type

type_list_opt   ::= /* empty */ | type (',' type)*

U32             ::= DIGIT+
STRING          ::= '"' (~["\\])* '"'
IDENTIFIER      ::= LETTER LETTER*
BOOL            ::= 'true' | 'false'
INT_OP          ::= '+' | '-' | '*' | '/' | '!=' | '==' | '<' | '<=' | '>' | '>='
BOOL_BINOP      ::= '||' | '&&'
BOOL_OP         ::= '!'

DIGIT           ::= [0-9]
LETTER          ::= [a-zA-Z]
```

## 5. Semantics

### 5.1 Expressions

Expressions are constructs that evaluate to a value. RustLike expressions include:

- Literals (integers, strings, booleans)
- Variable references
- Unary operations (logical not, dereference)
- Binary operations (arithmetic, comparison, logical)
- Function calls
- Block expressions
- If expressions
- Array and tuple literals
- Range expressions
- Index expressions

### 5.2 Statements

Statements are constructs that perform actions but do not produce values. RustLike statements include:

- Variable declarations
- Function declarations
- Expression statements (expressions followed by semicolons)
- If statements
- While loops
- Break and continue statements
- Print statements
- Block statements

### 5.3 Blocks

Blocks are sequences of statements enclosed in braces. A block can be either:
- A statement block: Executes a sequence of statements for their effects
- An expression block: Evaluates to the value of its final expression

### 5.4 Control Flow

Control flow constructs in RustLike include:

- **If expressions/statements**: Conditional execution based on a boolean expression
- **While loops**: Repeated execution while a condition is true
- **Break statements**: Exit from the innermost loop
- **Continue statements**: Skip to the next iteration of the innermost loop

### 5.5 Functions

Functions in RustLike are defined with the `fn` keyword, followed by:
- A name
- Parameter list with types
- Return type
- Function body as a block

Example:
```rust
fn add(a: u32, b: u32) -> u32 {
  a + b
}
```

### 5.6 Variables and Bindings

Variables are declared using the `let` keyword, a name, a type, and an initializer expression:

```rust
let x: u32 = 42;
```

Variable bindings are stored in two locations:
- Environments stored on the heap
- Frames stored on the runtime stack (RTS)

Heap-allocated bindings are used for closures and lexical scoping, while stack-allocated bindings are used for function parameters and temporary values.

### 5.7 References

References allow borrowing access to a value without taking ownership:

```rust
let x: u32 = 42;
let r: &u32 = &x;  // Create a reference to x
let y: u32 = *r;   // Dereference r to get the value of x
```

## 6. Type System

### 6.1 Type Checking Rules

The RustLikeTypeCheckerVisitor implements a comprehensive type checking system that enforces:

- All variables must have known types at compile time
- Expressions have types that are determined by the types of their sub-expressions
- Function arguments must match the parameter types of the function
- Function return values must match the declared return type
- Conditional expressions (if conditions, while conditions) must have boolean type
- Binary operators require operands of compatible types
- Index operations require an array/string and an integer index
- Reference creation produces a reference type
- Dereference operations require a reference type

### 6.2 Type Compatibility

Types are checked for compatibility using the `typeEqual` function that handles:
- Basic type equality for primitive types
- Structural equality for function types (checking parameter and return types)
- Reference type compatibility

### 6.3 Type Environment

The type checker maintains a `TypeEnvironment` that:
- Tracks the type of each variable in scope
- Handles nested scopes through a parent-child relationship
- Marks string types as "moved" when they are passed to functions
- Prevents use of variables after they have been moved

### 6.4 Move Semantics

String types and other heap-allocated values implement move semantics:
- When a string is passed to a function or assigned to another variable, it is marked as "moved"
- The type checker prevents access to moved values
- Primitives are copied rather than moved

## 7. Memory Model

### 7.1 Stack and Heap Architecture

The memory model consists of:

- **OS (Operand Stack)**: Holds intermediate values during computation
- **RTS (Runtime Stack)**: Contains call frames with local variables and return addresses
- **E (Environment Pointer)**: Points to the current environment frame on the heap
- **Heap**: Stores dynamically allocated data including strings, environments, and arrays

### 7.2 Heap Implementation

The heap is implemented as a structured memory area that stores:

- **Items**: Basic unit of storage with a tag, size, and value
- **Tags**: Identify the type of an item (NUMBER, BOOLEAN, STRING, ENVIRONMENT, etc.)
- **Environment Values**: Store variable bindings with pointers to parent environments
- **Closure Values**: Store function code pointers and captured variables

The heap implementation provides:
- Allocation of new items
- Lookup of items by address
- Garbage collection through scope-based deallocation

### 7.3 Closures and Variable Capture

Closures in RustLike:
- Are represented as stack-allocated function values
- Capture variables by value (move for heap values, copy for primitives)
- Do not contain references to environments since heap variables are moved
- Access captured variables via a capture list stored with the closure

When a closure is created:
1. The LDCC instruction (Load constant closure) captures all external variables used in the closure
2. When called (CALL instruction), parameters passed to the closure are bound
3. Variables are bound to arguments before external variables
4. Move semantics follow this binding order

### 7.4 Scope Management

Memory management is deterministic and scope-based:
- Entering a scope pushes a new frame onto the RTS
- Exiting a scope deallocates all heap objects created in that scope
- The ENTER_SCOPE and EXIT_SCOPE bytecode instructions manage scope entry and exit

## 8. Bytecode Instruction Set

The virtual machine operates using a stack-based instruction set:

### 8.1 Core Instructions

- **NOP**: No operation
- **POP**: Remove the top value from the operand stack
- **DONE**: End program execution

### 8.2 Loading Constants

- **LDCI**: Load constant integer
- **LDCB**: Load constant boolean
- **LDCS**: Load constant string
- **LDHS**: Load heap symbolic (for strings and functions)
- **LDPS**: Load primitive symbolic
- **LDCC**: Load constant closure

### 8.3 Arithmetic and Logic

- **PLUS**: Add two numbers
- **TIMES**: Multiply two numbers
- **NOT**: Boolean not
- **AND**: Boolean and
- **OR**: Boolean or
- **LT**: Less than
- **EQ**: Equal

### 8.4 Control Flow

- **JOF**: Jump on false
- **GOTO**: Unconditional jump
- **CALL**: Call a function
- **RET**: Return from a function

### 8.5 Variable and Memory Management

- **ENTER_SCOPE**: Enter a new scope
- **EXIT_SCOPE**: Exit current scope
- **ASSIGN**: Assign value to variable
- **FREE**: Free memory
- **DECL**: Declare identifier

### 8.6 Data Structure Operations

- **NEW_ARRAY**: Create new array from elements on stack
- **NEW_TUPLE**: Create new tuple from elements on stack
- **NEW_RANGE**: Create new range from start and end
- **INDEX**: Index into array/string
- **REF**: Create a reference to a value
- **DEREF**: Dereference a reference

## 9. Compiler Implementation

The compiler is implemented as a visitor pattern that traverses the AST and emits bytecode:

### 9.1 Single-Pass Compilation

The RustLikeCompilerVisitor is a single-pass compiler that:
- Directly emits bytecode instructions during AST traversal
- Follows a stack-based execution model where expression evaluations leave their result on the stack
- Uses no intermediate representations between AST and bytecode

### 9.2 Visit Methods

Key visitor methods include:
- **visitDecl**: Compiles variable declarations
- **visitExpr**: Main expression handling with dispatch to specialized methods
- **visitBinaryOpExpr**: Compiles binary operations
- **visitBlock_expr**: Handles block expressions with scope management
- **visitIf_expr**: Compiles conditional expressions with jump instructions
- **visitCallExpr**: Handles function calls with parameter passing

### 9.3 Optimization

The current implementation performs no optimization passes. The bytecode directly reflects the structure of the source code.

## 10. Virtual Machine Execution

### 10.1 Fetch-Decode-Execute Cycle

The RustLikeVirtualMachine executes bytecode using a traditional fetch-decode-execute cycle:
1. Fetch the instruction at the current PC
2. Decode the instruction opcode and operands
3. Execute the instruction, modifying VM state
4. Increment the PC to the next instruction

### 10.2 VM State

The virtual machine maintains the following state:
- **instrs**: Array of bytecode instructions
- **OS**: Operand stack for intermediate values
- **PC**: Program counter pointing to the current instruction
- **E**: Environment pointer to the current heap environment
- **RTS**: Runtime stack for call frames
- **heap**: Heap storage for dynamically allocated objects

### 10.3 Runtime Frames

Function calls create frames on the runtime stack that contain:
- **__return_pc**: Return address (PC value) for when the function returns
- **__old_env**: Pointer to the caller's environment
- **bindings**: Map of parameter names to values

## 11. Standard Library

### 11.1 Built-in Functions

- `print!`: Prints the value of an expression to the console

### 11.2 Primitive Operations

- Arithmetic operations: addition, subtraction, multiplication, division
- Comparison operations: equality, inequality, less than, greater than
- Logical operations: and, or, not
- String concatenation

## 12. Constraints and Limitations

Current implementation constraints include:
- No garbage collection; memory is freed via scope analysis
- All variables must be explicitly typed
- No mutable references (&mut T)
- No explicit return statements (last expression is implicitly returned)
- String literals are limited to basic characters (no escapes or Unicode)
- No operator precedence (operations evaluated strictly left-to-right)
- Limited standard library functionality