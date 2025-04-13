grammar RustLike;

prog: block EOF;

stmt_list: stmt+ ;

stmt 
    : expr_stmt
    | decl
    | fn_decl
    | print_stmt
    | bool_stmt
    ;

expr_stmt: expr ';' ;

decl: 'let' IDENTIFIER ':' type '=' expr ';' ;

fn_decl: 'fn' IDENTIFIER '(' param_list_opt ')' '->' type block ;

param_list_opt 
    : // empty
    | param_list;

param_list: param (',' param)* ;
param: IDENTIFIER ':' type ;

print_stmt: 'print' '(' expr ')' ';' ;

bool_stmt: bool_expr ';' ;

while_loop: 'while' bool_expr block ;

for_loop: 'for' IDENTIFIER 'in' tuple ':' type block ;

block: '{' stmt_list '}' ;

expression
    : int_expr
    | str_expr
    | bool_expr 
    ;

int_expr: INT (INT_OP INT)? ;

str_expr: STRING ('+' STRING)? ;

bool_expr
    : BOOL (BOOL_BINOP BOOL)?
    | BOOL_OP bool_expr 
    ;

tuple
    : '(' expr_list ')'
    | int_expr '..' int_expr
    ;

expr_list: expr (',' expr)* ;

expr
    : int_expr
    | str_expr
    | bool_expr 
    ;

type 
    : '()'
    | 'string'
    | 'int'
    | tuple_type
    | 'fn' '(' type_list ')' '->' type 
    ;

type_list: type (',' type)* ;

tuple_type: '(' type_list ')' ;

// Lexer Rules

INT: '-'? DIGIT+ ;

STRING: '"' LETTER* '"' ;

IDENTIFIER: LETTER LETTER* ;

BOOL: 'true' | 'false' ;

BOOL_BINOP: '||' | '&&' ;

BOOL_OP: '!' ;

INT_OP: '+' | '-' | '*' | '/' | '!=' | "==" | "<" | ">" | "<=" | ">=";

// Fragments

fragment DIGIT  : [0-9] ;
fragment LETTER : [a-zA-Z] ;

// Whitespace and Comments

WS: [ \t\r\n]+ -> skip ;
LINE_COMMENT: '//' ~[\r\n]* -> skip ;
