```
<digit>          ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
<u32>            ::= <digit> | <digit> <u32>

<letter>         ::= "a" | … | "z" | "A" | … | "Z"
<identifier>     ::= <letter> <identifier_rest>
<identifier_rest>::= "" | <letter> <identifier_rest>

<string>         ::= "" | <letter> <string>

<bool>           ::= "true" | "false"
<bool_binop>     ::= "||" | "&&"
<bool_op>        ::= "!"

<stmt_list>      ::= <stmt> | <stmt> <stmt_list>

<program>        ::= <stmt_list>

<stmt>           ::= <decl>
                  |  <fn_decl>
                  |  <print_stmt>
                  |  <if_stmt>
                  |  <while_loop>
                  |  <break_stmt>
                  |  <continue_stmt>
                  |  <expr_stmt>
                  |  <block>

<decl>           ::= "let" <identifier> ":" <type> "=" <expr> ";"
<fn_decl>        ::= "fn" <identifier> "(" <param_list_opt> ")" "->" <type> <block>
<param_list_opt> ::= "" | <param_list>
<param_list>     ::= <param> | <param> "," <param_list>
<param>          ::= <identifier> ":" <type>

<print_stmt>     ::= "print" "(" <expr> ")" ";"
<break_stmt>     ::= "break" ";"
<continue_stmt>  ::= "continue" ";"

<if_stmt>        ::= "if" <expr> <block> [ "else" <block> ]
<while_loop>     ::= "while" <expr> <block>

<block>          ::= "{" <stmt_list>? "}"

<expr_stmt>      ::= <expr> ";"

<expr>           ::= <unary_expr>
                  |  <expr> <INT_OP> <expr>
                  |  <expr> <BOOL_BINOP> <expr>

<unary_expr>     ::= <BOOL_OP> <unary_expr>
                  |  <primary>
                  |  <expr> "[" <expr> "]"         // indexing
                  |  <expr> "(" <arg_list_opt> ")" // call

<primary>        ::= <u32> | <string> | <bool>
                  |  <identifier>
                  |  "(" <expr> ")"
                  |  <if_expr>
                  |  <array_literal>
                  |  <tuple_expr>
                  |  <range_expr>

<arg_list_opt>   ::= "" | <expr> | <expr> "," <arg_list_opt>
<array_literal>  ::= "[" [ <expr> ("," <expr>)* ] "]"
<tuple_expr>     ::= "(" [ <expr> ("," <expr>)* ] ")"
<range_expr>     ::= <u32> ".." <u32>

<type>           ::= "()" | "u32" | "string"
                  |  "fn" "(" <type_list_opt> ")" "->" <type>

<type_list_opt>  ::= "" | <type> | <type> "," <type_list_opt>

<INT_OP>         ::= "+" | "-" | "*" | "/" | "!=" | "==" | "<" | ">" | "<=" | ">="
<BOOL_BINOP>     ::= "||" | "&&"
<BOOL_OP>        ::= "!"
```
Key idea:
- Implement Rust-style ownership semantics on heap-allocated (boxed) types.
- Non-heap types (e.g., u32, small tuples, inline arrays) should be copied by default, not moved.
- Exiting a scope { ... } automatically frees all heap allocations created in that block.
- Type checker ensures function call correctness and tracks moved values by marking their types as “moved”.
- Borrow checker assigns lifetimes to variables via a token system (incremented per scope entry/exit).
  -> Lifetimes stored in a map, not strictly tied to PC/time
  -> DFS over control flow ensures:
     - no invalid overlaps (e.g., &mut T with &T),
     - no use-after-free,
     - mut borrows are exclusive.

Additional info:
- All `let` declarations are immutable.
- All variables must be explicitly typed.
- Function returns are implicit (last expression).
- Strings only support alphabetical characters (no escapes or Unicode).
- Operator precedence is strictly left-to-right (no special precedence for *, /, etc.).
- Large or boxed values go on a heap (linked-list allocator).
- Heap memory is deterministically freed at scope exit.

Language Constraints & Notes
- No garbage collection: everything is freed via scope analysis.
- Stack values are simply dropped, no explicit free.
- Borrow and move rules enforced at compile time only (no runtime tracking).

Possible TODOs
- Add Rust-style macros
- Add pattern matching
- Support explicit `return` for early returns
- Add immutable borrows (&T) and coercions
- Expand heap support:
  -> Boxed arrays
  -> Nested boxes
  -> Larger data types
- Consider iterators or for-loops (optional, maybe skip)
- Integrate full tuple support (limited now for memory simplicity)
- Possibly remove tuples from heap allocation for simplicity
- Add boxed primitives (e.g., Box<u32>)
