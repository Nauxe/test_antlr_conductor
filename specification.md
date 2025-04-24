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

### 5.7 References

References allow borrowing access to a value without taking ownership:

```rust
let x: u32 = 42;
let r: &u32 = &x;  // Create a reference to x
let y: u32 = *r;   // Dereference r to get the value of x
```

## 6. Type System

### 6.1 Type Checking Rules

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

- Types are compatible if they are identical
- Reference types are compatible if their underlying types are compatible
- Function types are compatible if their parameter types and return types are compatible

### 6.3 Type Inference

In the current implementation, explicit type annotations are required for variable declarations and function parameters.

## 7. Memory Model

### 7.1 Stack and Heap Allocation

- Primitive values (u32, bool) are stored directly in variables
- Non-primitive values (strings, arrays) are allocated on the heap
- Function closures capture variables by value (move semantics)

### 7.2 Ownership and References

RustLike implements a simplified ownership model:
- Each value has a single owner at any time
- When a variable goes out of scope, its value is deallocated
- References provide temporary, non-owning access to values
- No lifetime annotations are required for references

## 8. Standard Library

### 8.1 Built-in Functions

- `print!`: Prints the value of an expression to the console

### 8.2 Primitive Operations

- Arithmetic operations: addition, subtraction, multiplication, division
- Comparison operations: equality, inequality, less than, greater than
- Logical operations: and, or, not
- String concatenation

## 9. Execution Model

RustLike programs are executed by:
1. Parsing the source code into an Abstract Syntax Tree (AST)
2. Type-checking the AST
3. Compiling the AST to bytecode instructions
4. Executing the bytecode on a stack-based virtual machine