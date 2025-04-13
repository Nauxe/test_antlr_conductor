```
<digit> ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
<int> ::= <digit> | <digit> <int> | "-" <int>

<letter> ::= "a" | "b" | "c" | ... | "z" | "A" | "B" | ... | "Z"
<identifier> ::= <letter> <identifier_rest>
<identifier_rest> ::= "" | <letter> <identifier_rest>
<string> ::= "" | <letter> <string>

<bool> ::= "true" | "false"
<bool_binop> ::= "||" | "&&"
<bool_op> ::= "!"
<bool_expr> ::= <bool> | <bool_expr> <bool_binop> <bool> | <bool_op> <bool_expr>
<bool_stmt> ::= <bool_expr> ";"

<op> ::= "+" | "-" | "*" | "/"
<int_expr> ::= <int> | <int_expr> <op> <int>
<str_expr> ::= <string> | <string> "+" <string>
<expr> ::= <int_expr> | <str_expr> | <bool_expr>
<expr_list> ::= <expr> | <expr> "," <expr>
<expr_stmt>::= <expression> ";"

<tuple> ::=  "(" <expr_list> ")" | <int_expr> ".." <int_expr>

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
- Implement rust ownership semantics on heap allocated tuples
- Non-heap allocated structures should be copied and not moved

Additional info:
- All declarations are immutable
- All declarations are typed explicitly
- Functions return the value of their last executed statement
- 1..10 is expanded to tuple (1, 2, ..., 9)
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
