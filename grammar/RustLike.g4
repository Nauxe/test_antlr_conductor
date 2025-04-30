grammar RustLike;

// Keywords and basic tokens
LET: 'let';
COLON: ':';
ASSIGN: '=';
SEMI: ';';
FN: 'fn';
LPAREN: '(';
RPAREN: ')';
ARROW: '->';
COMMA: ',';
PRINT: 'print!';
BREAK: 'break';
CONTINUE: 'continue';
IF: 'if';
ELSE: 'else';
WHILE: 'while';
LBRACE: '{';
RBRACE: '}';
AMP: '&';
STAR: '*';
LBRACK: '[';
RBRACK: ']';
RANGE: '..';
PLUS: '+';
UNIT: '()';

// Types
TYPE_U32: 'u32';
TYPE_BOOL: 'bool';
TYPE_STRING: 'string';

// Literals and identifiers
IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_]*;
U32_LITERAL: [0-9]+;
BOOL_LITERAL: 'true' | 'false';
STRING_LITERAL: '"' (~["\\\r\n] | '\\' .)* '"';

// Operators
INT_OP: '+' | '-' | '*' | '/' | '%';
BOOL_BINOP: '&&' | '||';
BOOL_OP: '!';

// Skip whitespace and comments
WS: [ \t\r\n]+ -> skip;
LINE_COMMENT: '//' ~[\r\n]* -> skip;
BLOCK_COMMENT: '/*' .*? '*/' -> skip;

// Program structure
prog: block_expr EOF | block_stmt EOF;

stmt_list: stmt*;

stmt
    : decl
    | fn_decl
    | print_stmt
    | if_stmt
    | while_loop
    | break_stmt
    | continue_stmt
    | expr_stmt
    | block_stmt
    ;

decl: IDENTIFIER COLON type ASSIGN expr SEMI;

fn_decl: FN IDENTIFIER param_list_opt ARROW type (block_stmt | block_expr);

param_list_opt: LPAREN param_list? RPAREN;

param_list: param (COMMA param)*;

param: IDENTIFIER COLON type;

print_stmt: PRINT expr SEMI;

break_stmt: BREAK SEMI;

continue_stmt: CONTINUE SEMI;

expr_stmt: expr SEMI;

if_stmt: IF expr block_stmt (ELSE block_stmt)?;

while_loop: WHILE expr block_stmt;

block_stmt: LBRACE stmt_list RBRACE;

block_expr: LBRACE stmt_list expr RBRACE;

expr
    : primary                                # PrimaryExpr
    | expr LBRACK expr RBRACK               # IndexExpr
    | BOOL_OP expr                          # UnaryExpr
    | AMP expr                              # RefExpr
    | STAR expr                             # DerefExpr
    | expr BOOL_BINOP expr                  # LogicalExpr
    | expr INT_OP expr                      # BinaryOpExpr
    | expr LPAREN arg_list_opt RPAREN       # CallExpr
    ;

primary
    : u32_expr
    | str_expr
    | bool_expr
    | IDENTIFIER
    | LPAREN expr RPAREN
    | if_expr
    | array_literal
    | tuple_expr
    | range_expr
    | block_expr
    ;

arg_list_opt: expr (COMMA expr)*;

if_expr: IF expr block_expr (ELSE block_expr)?;

array_literal: LBRACK expr (COMMA expr)* RBRACK;

tuple_expr: LPAREN expr (COMMA expr)+ RPAREN;

range_expr: u32_expr RANGE u32_expr;

u32_expr: U32_LITERAL;

str_expr: STRING_LITERAL;

bool_expr: BOOL_LITERAL;

type
    : TYPE_U32
    | TYPE_BOOL
    | TYPE_STRING
    | AMP type
    | STAR type
    | LBRACK type RBRACK
    | LPAREN type_list_opt RPAREN
    ;

type_list_opt: type (COMMA type)*; 