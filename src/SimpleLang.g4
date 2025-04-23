grammar SimpleLang;

prog: stmt* EOF;

stmt
    : fn_decl
    | expr_stmt
    ;

fn_decl
    : 'fn' IDENTIFIER '(' param_list? ')' '->' type block
    ;

param_list
    : param (',' param)*
    ;

param
    : IDENTIFIER ':' type
    ;

type
    : 'u32'
    | 'bool'
    | 'string'
    | '()'
    ;

block
    : '{' stmt* expr? '}'
    ;

expr_stmt
    : expr ';'
    ;

expr
    : expr op=('*'|'/') expr
    | expr op=('+'|'-') expr
    | expr op=('=='|'!='|'<'|'>'|'<='|'>=') expr
    | expr op=('&&'|'||') expr
    | '!' expr
    | IDENTIFIER '(' expr_list? ')'
    | IDENTIFIER
    | INT
    | BOOL
    | STRING
    | '(' expr ')'
    ;

expr_list
    : expr (',' expr)*
    ;

IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_]*;
INT: [0-9]+;
BOOL: 'true' | 'false';
STRING: '"' (~["\\\r\n] | '\\' .)* '"';
WS: [ \t\r\n]+ -> skip;
COMMENT: '//' ~[\r\n]* -> skip;