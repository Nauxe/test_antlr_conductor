grammar RustLike;

// ─── Entry Point ─────────────────────────────────────────────────────────────
prog
    : stmt_list EOF
    ;

// ─── Statements ──────────────────────────────────────────────────────────────
stmt_list
    : stmt+
    ;

stmt
    : decl                     // immutable variable declaration
    | fn_decl                  // function declaration
    | print_stmt               // print statement
    | if_stmt                  // if‑statement
    | while_loop               // while loop
    | break_stmt               // break;
    | continue_stmt            // continue;
    | expr_stmt                // any expr as statement
    | block_stmt               // nested block
    ;

// ─── Declarations ────────────────────────────────────────────────────────────
decl
    : 'let' IDENTIFIER ':' type '=' expr ';'
    ;

// ─── Functions ───────────────────────────────────────────────────────────────
fn_decl
    : 'fn' IDENTIFIER '(' param_list_opt ')' '->' type (block_stmt | block_expr)
    ;

param_list_opt 
    : /* empty */
    | param_list
    ;
param_list
    : param (',' param)*
    ;
param
    : IDENTIFIER ':' type
    ;

// ─── Simple statements ───────────────────────────────────────────────────────
print_stmt      : 'print!' '(' expr ')' ';' ;
break_stmt      : 'break' ';' ;
continue_stmt   : 'continue' ';' ;
expr_stmt       : expr ';' ;

// ─── Control flow ────────────────────────────────────────────────────────────
if_stmt     : 'if' expr block_stmt ('else' block_stmt)? ;
while_loop  : 'while' expr block_stmt ; // While loops are not value producing

// ─── Blocks ─────────────────────────────────────────────────────────────────
block_stmt
    : '{' stmt_list '}'
    ;

block_expr
  : '{' stmt_list expr '}'
  ;

// ─── Expressions ─────────────────────────────────────────────────────────────
// A single left‑recursive expr rule, handling:
//   - unary ops
//   - suffix indexing:  e[ idx ]
//   - suffix calls:     f( args )
//   - binary ops (arithmetic & comparison)
//   - logical ops
//   - primary atoms
expr
    : BOOL_OP expr                               # unaryExpr
    | '&' expr                                   # refExpr
    | '*' expr                                   # derefExpr
    | expr '[' expr ']'                          # indexExpr
    | expr '(' arg_list_opt ')'                  # callExpr
    | expr (TIMES | DIV) expr                    # mulDivExpr
    | expr (PLUS | MINUS) expr                   # addSubExpr
    | expr ('==' | '!=' | '<' | '<=' | '>' | '>=') expr # comparisonExpr
    | expr BOOL_BINOP expr                       # logicalExpr
    | primary                                    # primaryExpr
    ;

primary
    : u32_expr
    | str_expr
    | bool_expr
    | IDENTIFIER
    | '(' expr ')'                               // parenthesized
    | if_expr
    | array_literal
    | tuple_expr
    | range_expr
    | block_expr
    ;

arg_list_opt
    : /* empty */
    | expr (',' expr)*
    ;

if_expr
    : 'if' expr block_expr ('else' block_expr)?
    ;

array_literal
    : '[' (expr (',' expr)*)? ']'
    ;

// Tuple literal
tuple_expr
    : '(' (expr (',' expr)*)? ')'
    ;

// Range expression
range_expr
    : u32_expr '..' u32_expr
    ;

// ─── Leaf Expressions ────────────────────────────────────────────────────────
u32_expr   : U32 ;
str_expr   : STRING ('+' STRING)? ;
bool_expr  : BOOL ;

// ─── Types ───────────────────────────────────────────────────────────────────
type
    : '()'                     // unit
    | 'u32'
    | 'bool'
    | 'string'
    | '&' type                // reference type
    | 'fn' '(' type_list_opt ')' '->' type
    ;

type_list_opt
    : /* empty */ 
    | type (',' type)*
    ;

// ─── Lexer Rules ─────────────────────────────────────────────────────────────
U32        : DIGIT+ ;
STRING     : '"' (~["\\])* '"' ;
IDENTIFIER : LETTER LETTER* ;
BOOL       : 'true' | 'false' ;
BOOL_BINOP : '||' | '&&' ;
BOOL_OP    : '!' ;

// Arithmetic operators
PLUS       : '+' ;
MINUS      : '-' ;
TIMES      : '*' ;
DIV        : '/' ;

fragment DIGIT  : [0-9] ;
fragment LETTER : [a-zA-Z] ;

WS           : [ \t\r\n]+ -> skip ;
LINE_COMMENT : '//' ~[\r\n]* -> skip ;
