grammar RustLike;

prog: stmt_list EOF;

stmt_list: stmt+ ;

stmt 
    : expr_stmt
    | decl
    | fn_decl
    | print_stmt
    | bool_stmt
    ;

expr_stmt: expr ';' ;

decl: 'let' identifier ':' type '=' expr ';' ;

fn_decl: 'fn' identifier '(' param_list_opt ')' '->' type block ;

param_list_opt 
    : // empty
    | param_list;

param_list: param (',' param)* ;
param: identifier ':' type ;

print_stmt: 'print' '(' expr ')' ';' ;

bool_stmt: bool_expr ';' ;

while_loop: 'while' bool_expr block ;

for_loop: 'for' identifier 'in' tuple ':' type block ;

block: '{' stmt_list '}' ;

expression
    : int_expr
    | str_expr
    | bool_expr 
    ;

int_expr: int (op int)? ;

str_expr: string ('+' string)? ;

bool_expr
    : bool_val (bool_binop bool_val)?
    | bool_op bool_expr 
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

int: '-'? DIGIT+ ;

string: LETTER* ;

identifier: LETTER LETTER* ;

bool_val: 'true' | 'false' ;

bool_binop: '||' | '&&' ;

bool_op: '!' ;

op: '+' | '-' | '*' | '/' ;

// Fragments

fragment DIGIT  : [0-9] ;
fragment LETTER : [a-zA-Z] ;

// Whitespace and Comments

WS: [ \t\r\n]+ -> skip ;
LINE_COMMENT: '//' ~[\r\n]* -> skip ;
