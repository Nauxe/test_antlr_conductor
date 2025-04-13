```
<digit> ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
<u32> ::= <digit> | <digit> <u32> 

<letter> ::= "a" | "b" | "c" | ... | "z" | "A" | "B" | ... | "Z"
<identifier> ::= <letter> <identifier_rest>
<identifier_rest> ::= "" | <letter> <identifier_rest>
<string> ::= "" | <letter> <string>

<bool> ::= "true" | "false"
<bool_binop> ::= "||" | "&&"
<bool_op> ::= "!"
<bool_expr> ::= <bool> | <bool_expr> <bool_binop> <bool> | <bool_op> <bool_expr>
<bool_stmt> ::= <bool_expr> ";"

<op> ::= "+" | "-" | "*" | "/" | '!=' | "==" | "<" | ">" | "<=" | ">="
<u32_expr> ::= <u32> | <u32_expr> <op> <u32>
<str_expr> ::= <string> | <string> "+" <string> 
<expr> ::= <u32_expr> | <str_expr> | <bool_expr>
<expr_list> ::= <expr> | <expr> "," <expr>
<expr_stmt>::= <expression> ";"

<tuple> ::=  "(" <expr_list> ")" 

<type> ::= "()" | "string" | "int" | <tuple_type> | "fn" "("<type_list>")" "->" <type>
<type_list> ::= <type> | <type> "," <type>
<tuple_type> ::= "("<type_list>")"

<decl> ::= "let" <identifier> ":" <type> "=" <expression> ";"

<param_list_opt> ::= "" | <param_list>
<param_list> ::= <identifier> ":" <type> | <identifier> ":" <type> "," <param_list>

<fn_decl> ::= "fn" <identifier> "(" <param_list_opt> ")" "->" <type> <block>  

<print_stmt> ::= "print" "("<expr>")" ";"
<while_loop> ::= "while" <bool_expr> <block>
<for_loop> ::= "for" <identifier> "in" <tuple> ":" <type> <block>

<program> ::= <stmt_list>
<stmt> ::= <expr_stmt> | <decl> | <fn_decl> | <print_stmt> | <bool_stmt>
<stmt_list> ::= <stmt> | <stmt> <stmt_list>
<block> ::= "{" <stmt_list> "}"
```
Key idea:
- Implement rust ownership semantics on heap allocated boxed types  (unsure if we should remove tuples from implementation later on for easier memory management)
- Non-heap allocated structures should be copied and not moved
- Exiting a scope frees all allocations within the scope at runtime
- Type checker checks all function calls and keeps track of types that are moved by changing their type to a moved type
- Borrow checker should compare scopes to determine whether all borrows are valid by annotating the lifetime of each variable in a hashmap -> lifetime should correspond to a different number than the PC, incrementing from 0 according to scope enters and scope exits, should be more loosely linked to time of execution. This has to explore all paths in the program via DFS 

Additional info:
- All declarations are immutable
- All declarations are typed explicitly
- Functions return the value of their last executed statement
- strings can only contain alphabetical letters
- Operator precedence is left to right (!, \*, and / do not have precedence over other operations)
- Heaps allocate objects that are too large via a linked list

Possible TODOs:
- Add rust macros
- Add pattern matching
- Add function return statements
- Add immutable borrows
- Add iterators? -> Not necessary
- Add larger size data! (heap memory support)
- Add boxed data! e.g. boxed ints
- ...
