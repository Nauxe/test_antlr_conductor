// Generated from grammar/RustLike.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgContext } from "./RustLikeParser.js";
import { Stmt_listContext } from "./RustLikeParser.js";
import { StmtContext } from "./RustLikeParser.js";
import { DeclContext } from "./RustLikeParser.js";
import { Fn_declContext } from "./RustLikeParser.js";
import { Param_list_optContext } from "./RustLikeParser.js";
import { Param_listContext } from "./RustLikeParser.js";
import { ParamContext } from "./RustLikeParser.js";
import { Print_stmtContext } from "./RustLikeParser.js";
import { Break_stmtContext } from "./RustLikeParser.js";
import { Continue_stmtContext } from "./RustLikeParser.js";
import { Expr_stmtContext } from "./RustLikeParser.js";
import { If_stmtContext } from "./RustLikeParser.js";
import { While_loopContext } from "./RustLikeParser.js";
import { BlockContext } from "./RustLikeParser.js";
import { IndexExprContext } from "./RustLikeParser.js";
import { UnaryExprContext } from "./RustLikeParser.js";
import { PrimaryExprContext } from "./RustLikeParser.js";
import { LogicalExprContext } from "./RustLikeParser.js";
import { BinaryOpExprContext } from "./RustLikeParser.js";
import { CallExprContext } from "./RustLikeParser.js";
import { PrimaryContext } from "./RustLikeParser.js";
import { Arg_list_optContext } from "./RustLikeParser.js";
import { If_exprContext } from "./RustLikeParser.js";
import { Array_literalContext } from "./RustLikeParser.js";
import { Tuple_exprContext } from "./RustLikeParser.js";
import { Range_exprContext } from "./RustLikeParser.js";
import { U32_exprContext } from "./RustLikeParser.js";
import { Str_exprContext } from "./RustLikeParser.js";
import { Bool_exprContext } from "./RustLikeParser.js";
import { TypeContext } from "./RustLikeParser.js";
import { Type_list_optContext } from "./RustLikeParser.js";


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
     * Enter a parse tree produced by `RustLikeParser.break_stmt`.
     * @param ctx the parse tree
     */
    enterBreak_stmt?: (ctx: Break_stmtContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.break_stmt`.
     * @param ctx the parse tree
     */
    exitBreak_stmt?: (ctx: Break_stmtContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.continue_stmt`.
     * @param ctx the parse tree
     */
    enterContinue_stmt?: (ctx: Continue_stmtContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.continue_stmt`.
     * @param ctx the parse tree
     */
    exitContinue_stmt?: (ctx: Continue_stmtContext) => void;
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
     * Enter a parse tree produced by `RustLikeParser.if_stmt`.
     * @param ctx the parse tree
     */
    enterIf_stmt?: (ctx: If_stmtContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.if_stmt`.
     * @param ctx the parse tree
     */
    exitIf_stmt?: (ctx: If_stmtContext) => void;
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
     * Enter a parse tree produced by the `indexExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    enterIndexExpr?: (ctx: IndexExprContext) => void;
    /**
     * Exit a parse tree produced by the `indexExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    exitIndexExpr?: (ctx: IndexExprContext) => void;
    /**
     * Enter a parse tree produced by the `unaryExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    enterUnaryExpr?: (ctx: UnaryExprContext) => void;
    /**
     * Exit a parse tree produced by the `unaryExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    exitUnaryExpr?: (ctx: UnaryExprContext) => void;
    /**
     * Enter a parse tree produced by the `primaryExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    enterPrimaryExpr?: (ctx: PrimaryExprContext) => void;
    /**
     * Exit a parse tree produced by the `primaryExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    exitPrimaryExpr?: (ctx: PrimaryExprContext) => void;
    /**
     * Enter a parse tree produced by the `logicalExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    enterLogicalExpr?: (ctx: LogicalExprContext) => void;
    /**
     * Exit a parse tree produced by the `logicalExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    exitLogicalExpr?: (ctx: LogicalExprContext) => void;
    /**
     * Enter a parse tree produced by the `binaryOpExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    enterBinaryOpExpr?: (ctx: BinaryOpExprContext) => void;
    /**
     * Exit a parse tree produced by the `binaryOpExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    exitBinaryOpExpr?: (ctx: BinaryOpExprContext) => void;
    /**
     * Enter a parse tree produced by the `callExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    enterCallExpr?: (ctx: CallExprContext) => void;
    /**
     * Exit a parse tree produced by the `callExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     */
    exitCallExpr?: (ctx: CallExprContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.primary`.
     * @param ctx the parse tree
     */
    enterPrimary?: (ctx: PrimaryContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.primary`.
     * @param ctx the parse tree
     */
    exitPrimary?: (ctx: PrimaryContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.arg_list_opt`.
     * @param ctx the parse tree
     */
    enterArg_list_opt?: (ctx: Arg_list_optContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.arg_list_opt`.
     * @param ctx the parse tree
     */
    exitArg_list_opt?: (ctx: Arg_list_optContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.if_expr`.
     * @param ctx the parse tree
     */
    enterIf_expr?: (ctx: If_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.if_expr`.
     * @param ctx the parse tree
     */
    exitIf_expr?: (ctx: If_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.array_literal`.
     * @param ctx the parse tree
     */
    enterArray_literal?: (ctx: Array_literalContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.array_literal`.
     * @param ctx the parse tree
     */
    exitArray_literal?: (ctx: Array_literalContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.tuple_expr`.
     * @param ctx the parse tree
     */
    enterTuple_expr?: (ctx: Tuple_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.tuple_expr`.
     * @param ctx the parse tree
     */
    exitTuple_expr?: (ctx: Tuple_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.range_expr`.
     * @param ctx the parse tree
     */
    enterRange_expr?: (ctx: Range_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.range_expr`.
     * @param ctx the parse tree
     */
    exitRange_expr?: (ctx: Range_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustLikeParser.u32_expr`.
     * @param ctx the parse tree
     */
    enterU32_expr?: (ctx: U32_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.u32_expr`.
     * @param ctx the parse tree
     */
    exitU32_expr?: (ctx: U32_exprContext) => void;
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
     * Enter a parse tree produced by `RustLikeParser.type_list_opt`.
     * @param ctx the parse tree
     */
    enterType_list_opt?: (ctx: Type_list_optContext) => void;
    /**
     * Exit a parse tree produced by `RustLikeParser.type_list_opt`.
     * @param ctx the parse tree
     */
    exitType_list_opt?: (ctx: Type_list_optContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

