grammar RustLike;

// Keywords and basic tokens
SEMI: ';';
COMMA: ',';
LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';

// Operators
PLUS: '+';
MINUS: '-';
TIMES: '*';
DIV: '/';
MOD: '%';
EQ: '==';
NEQ: '!=';
LT: '<';
GT: '>';
LTE: '<=';
GTE: '>=';
AND: '&&';
OR: '||';
NOT: '!';

// Literals and identifiers
ID: [a-zA-Z_][a-zA-Z0-9_]*;
INT: [0-9]+;
FLOAT: [0-9]+ '.' [0-9]+;
TRUE: 'true';
FALSE: 'false';

// Skip whitespace and comments
WS: [ \t\r\n]+ -> skip;
COMMENT: '//' ~[\r\n]* -> skip;
BLOCK_COMMENT: '/*' .*? '*/' -> skip;

// Program structure
prog: stmt* EOF;

stmt
    : expr SEMI                    # ExprStmt
    | block                        # BlockStmt
    ;

block: LBRACE stmt* RBRACE;

expr
    : primary                                # PrimaryExpr
    | op=(MINUS | NOT) expr                 # UnaryExpr
    | expr op=(TIMES | DIV | MOD) expr      # MulDivModExpr
    | expr op=(PLUS | MINUS) expr           # AddSubExpr
    | expr op=(LT | GT | LTE | GTE) expr    # CompareExpr
    | expr op=(EQ | NEQ) expr               # EqualityExpr
    | expr AND expr                         # AndExpr
    | expr OR expr                          # OrExpr
    ;

primary
    : INT                           # IntLiteral
    | FLOAT                         # FloatLiteral
    | TRUE                          # TrueLiteral
    | FALSE                         # FalseLiteral
    | ID                            # Identifier
    | LPAREN expr RPAREN           # ParenExpr
    ;

args: expr (COMMA expr)*; 