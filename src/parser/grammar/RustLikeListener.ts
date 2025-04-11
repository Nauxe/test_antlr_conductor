// Generated from grammar/RustLike.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgContext } from "./RustLikeParser.js";
import { Stmt_listContext } from "./RustLikeParser.js";
import { StmtContext } from "./RustLikeParser.js";
import { Expr_stmtContext } from "./RustLikeParser.js";
import { DeclContext } from "./RustLikeParser.js";
import { Fn_declContext } from "./RustLikeParser.js";
import { Param_list_optContext } from "./RustLikeParser.js";
import { Param_listContext } from "./RustLikeParser.js";
import { ParamContext } from "./RustLikeParser.js";
import { Print_stmtContext } from "./RustLikeParser.js";
import { Bool_stmtContext } from "./RustLikeParser.js";
import { While_loopContext } from "./RustLikeParser.js";
import { For_loopContext } from "./RustLikeParser.js";
import { BlockContext } from "./RustLikeParser.js";
import { ExpressionContext } from "./RustLikeParser.js";
import { Int_exprContext } from "./RustLikeParser.js";
import { Str_exprContext } from "./RustLikeParser.js";
import { Bool_exprContext } from "./RustLikeParser.js";
import { TupleContext } from "./RustLikeParser.js";
import { Expr_listContext } from "./RustLikeParser.js";
import { ExprContext } from "./RustLikeParser.js";
import { TypeContext } from "./RustLikeParser.js";
import { Type_listContext } from "./RustLikeParser.js";
import { Tuple_typeContext } from "./RustLikeParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `RustLikeParser`.
 */
export class RustLikeListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `RustLikeParser.prog`.
     * @param ctx the parse tree
     */
    enterProg?: (ctx: ProgContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.prog`.
     * @param ctx the parse tree
     */
    exitProg?: (ctx: ProgContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.stmt_list`.
     * @param ctx the parse tree
     */
    enterStmt_list?: (ctx: Stmt_listContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.stmt_list`.
     * @param ctx the parse tree
     */
    exitStmt_list?: (ctx: Stmt_listContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.stmt`.
     * @param ctx the parse tree
     */
    enterStmt?: (ctx: StmtContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.stmt`.
     * @param ctx the parse tree
     */
    exitStmt?: (ctx: StmtContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.expr_stmt`.
     * @param ctx the parse tree
     */
    enterExpr_stmt?: (ctx: Expr_stmtContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.expr_stmt`.
     * @param ctx the parse tree
     */
    exitExpr_stmt?: (ctx: Expr_stmtContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.decl`.
     * @param ctx the parse tree
     */
    enterDecl?: (ctx: DeclContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.decl`.
     * @param ctx the parse tree
     */
    exitDecl?: (ctx: DeclContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.fn_decl`.
     * @param ctx the parse tree
     */
    enterFn_decl?: (ctx: Fn_declContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.fn_decl`.
     * @param ctx the parse tree
     */
    exitFn_decl?: (ctx: Fn_declContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.param_list_opt`.
     * @param ctx the parse tree
     */
    enterParam_list_opt?: (ctx: Param_list_optContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.param_list_opt`.
     * @param ctx the parse tree
     */
    exitParam_list_opt?: (ctx: Param_list_optContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.param_list`.
     * @param ctx the parse tree
     */
    enterParam_list?: (ctx: Param_listContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.param_list`.
     * @param ctx the parse tree
     */
    exitParam_list?: (ctx: Param_listContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.param`.
     * @param ctx the parse tree
     */
    enterParam?: (ctx: ParamContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.param`.
     * @param ctx the parse tree
     */
    exitParam?: (ctx: ParamContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.print_stmt`.
     * @param ctx the parse tree
     */
    enterPrint_stmt?: (ctx: Print_stmtContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.print_stmt`.
     * @param ctx the parse tree
     */
    exitPrint_stmt?: (ctx: Print_stmtContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.bool_stmt`.
     * @param ctx the parse tree
     */
    enterBool_stmt?: (ctx: Bool_stmtContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.bool_stmt`.
     * @param ctx the parse tree
     */
    exitBool_stmt?: (ctx: Bool_stmtContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.while_loop`.
     * @param ctx the parse tree
     */
    enterWhile_loop?: (ctx: While_loopContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.while_loop`.
     * @param ctx the parse tree
     */
    exitWhile_loop?: (ctx: While_loopContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.for_loop`.
     * @param ctx the parse tree
     */
    enterFor_loop?: (ctx: For_loopContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.for_loop`.
     * @param ctx the parse tree
     */
    exitFor_loop?: (ctx: For_loopContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.int_expr`.
     * @param ctx the parse tree
     */
    enterInt_expr?: (ctx: Int_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.int_expr`.
     * @param ctx the parse tree
     */
    exitInt_expr?: (ctx: Int_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.str_expr`.
     * @param ctx the parse tree
     */
    enterStr_expr?: (ctx: Str_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.str_expr`.
     * @param ctx the parse tree
     */
    exitStr_expr?: (ctx: Str_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.bool_expr`.
     * @param ctx the parse tree
     */
    enterBool_expr?: (ctx: Bool_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.bool_expr`.
     * @param ctx the parse tree
     */
    exitBool_expr?: (ctx: Bool_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.tuple`.
     * @param ctx the parse tree
     */
    enterTuple?: (ctx: TupleContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.tuple`.
     * @param ctx the parse tree
     */
    exitTuple?: (ctx: TupleContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.expr_list`.
     * @param ctx the parse tree
     */
    enterExpr_list?: (ctx: Expr_listContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.expr_list`.
     * @param ctx the parse tree
     */
    exitExpr_list?: (ctx: Expr_listContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    enterExpr?: (ctx: ExprContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    exitExpr?: (ctx: ExprContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.type`.
     * @param ctx the parse tree
     */
    enterType?: (ctx: TypeContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.type`.
     * @param ctx the parse tree
     */
    exitType?: (ctx: TypeContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.type_list`.
     * @param ctx the parse tree
     */
    enterType_list?: (ctx: Type_listContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.type_list`.
     * @param ctx the parse tree
     */
    exitType_list?: (ctx: Type_listContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.tuple_type`.
     * @param ctx the parse tree
     */
    enterTuple_type?: (ctx: Tuple_typeContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.tuple_type`.
     * @param ctx the parse tree
     */
    exitTuple_type?: (ctx: Tuple_typeContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

