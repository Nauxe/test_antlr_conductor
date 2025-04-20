grammar RustLike;

prog
    : stmt_list EOF
    ;

stmt_list
    : stmt+
    ;

stmt
    : decl                     // let / let mut
    | assignment               // reassign mutable bindings
    | fn_decl
    | return_stmt              // early return
    | print_stmt
    | if_stmt                  // if as statement/expression
    | while_loop
    | for_loop
    | break_stmt               // loop control
    | continue_stmt            // loop control
    | expr_stmt                // any expr as statement
    | block
    ;

decl
    : 'let' ('mut')? IDENTIFIER ':' type '=' expr ';'
    ;

assignment
    : IDENTIFIER '=' expr ';'
    ;

fn_decl
    : 'fn' IDENTIFIER '(' param_list_opt ')' '->' type block
    ;

return_stmt
    : 'return' expr ';'
    ;

print_stmt
    : 'print' '(' expr ')' ';'
    ;

if_stmt
    : 'if' expr block ('else' block)?
    ;

while_loop
    : 'while' expr block
    ;

for_loop
    : 'for' IDENTIFIER 'in' tuple ':' type block
    ;

break_stmt
    : 'break' ';'
    ;

continue_stmt
    : 'continue' ';'
    ;

block
    : '{' stmt_list '}'
    ;

expr_stmt
    : expr ';'
    ;

// -- Expressions ------------------------------------------------------------

expr
    : u32_expr
    | str_expr
    | bool_expr
    | IDENTIFIER
    | call_expr
    | index_expr
    | if_expr
    | array_literal
    | tuple_expr
    | range_expr
    | expr INT_OP expr       // binary arithmetic/comparison
    | expr BOOL_BINOP expr   // logical ops
    | BOOL_OP expr           // unary !, -
    | '(' expr ')'
    ;

call_expr
    : IDENTIFIER '(' arg_list_opt ')'
    ;

index_expr
    : expr '[' expr ']'
    ;

arg_list_opt
    :                             // empty
    | expr (',' expr)*
    ;

if_expr
    : 'if' expr block ('else' block)?
    ;

array_literal
    : '[' (expr (',' expr)*)? ']'
    ;

tuple_expr
    : '(' expr_list ')'
    ;

range_expr
    : u32_expr '..' u32_expr
    ;

expr_list
    : expr (',' expr)*
    ;

u32_expr
    : U32
    ;

str_expr
    : STRING ('+' STRING)?
    ;

bool_expr
    : BOOL
    ;

// -- Types ------------------------------------------------------------------

type
    : '()'
    | 'u32'
    | 'string'
    | '(' type (',' type)+ ')'       // multi‑element tuples only
    | 'fn' '(' type_list_opt ')' '->' type
    ;

type_list_opt
    :                             // empty
    | type (',' type)*
    ;

// -- Lexer Rules ------------------------------------------------------------

U32           : DIGIT+ ;
STRING        : '"' (~["\\])* '"' ;
IDENTIFIER    : LETTER LETTER* ;
BOOL          : 'true' | 'false' ;
INT_OP        : '+' | '-' | '*' | '/' | '!=' | '==' | '<' | '<=' | '>' | '>=' ;
BOOL_BINOP    : '||' | '&&' ;
BOOL_OP       : '!' ;

fragment DIGIT  : [0-9] ;
fragment LETTER : [a-zA-Z] ;

WS            : [ \t\r\n]+ -> skip ;
LINE_COMMENT  : '//' ~[\r\n]* -> skip ;