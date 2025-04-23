// Generated from grammar/RustLike.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


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
import { Block_stmtContext } from "./RustLikeParser.js";
import { Block_exprContext } from "./RustLikeParser.js";
import { IndexExprContext } from "./RustLikeParser.js";
import { UnaryExprContext } from "./RustLikeParser.js";
import { PrimaryExprContext } from "./RustLikeParser.js";
import { RefExprContext } from "./RustLikeParser.js";
import { DerefExprContext } from "./RustLikeParser.js";
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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `RustLikeParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class RustLikeVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `RustLikeParser.prog`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProg?: (ctx: ProgContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.stmt_list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStmt_list?: (ctx: Stmt_listContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStmt?: (ctx: StmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.decl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDecl?: (ctx: DeclContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.fn_decl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFn_decl?: (ctx: Fn_declContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.param_list_opt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParam_list_opt?: (ctx: Param_list_optContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.param_list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParam_list?: (ctx: Param_listContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.param`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParam?: (ctx: ParamContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.print_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrint_stmt?: (ctx: Print_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.break_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBreak_stmt?: (ctx: Break_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.continue_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitContinue_stmt?: (ctx: Continue_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.expr_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpr_stmt?: (ctx: Expr_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.if_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIf_stmt?: (ctx: If_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.while_loop`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWhile_loop?: (ctx: While_loopContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.block_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlock_stmt?: (ctx: Block_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.block_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlock_expr?: (ctx: Block_exprContext) => Result;
    /**
     * Visit a parse tree produced by the `indexExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIndexExpr?: (ctx: IndexExprContext) => Result;
    /**
     * Visit a parse tree produced by the `unaryExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnaryExpr?: (ctx: UnaryExprContext) => Result;
    /**
     * Visit a parse tree produced by the `primaryExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrimaryExpr?: (ctx: PrimaryExprContext) => Result;
    /**
     * Visit a parse tree produced by the `refExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRefExpr?: (ctx: RefExprContext) => Result;
    /**
     * Visit a parse tree produced by the `derefExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDerefExpr?: (ctx: DerefExprContext) => Result;
    /**
     * Visit a parse tree produced by the `logicalExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLogicalExpr?: (ctx: LogicalExprContext) => Result;
    /**
     * Visit a parse tree produced by the `binaryOpExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBinaryOpExpr?: (ctx: BinaryOpExprContext) => Result;
    /**
     * Visit a parse tree produced by the `callExpr`
     * labeled alternative in `RustLikeParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCallExpr?: (ctx: CallExprContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.primary`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrimary?: (ctx: PrimaryContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.arg_list_opt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArg_list_opt?: (ctx: Arg_list_optContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.if_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIf_expr?: (ctx: If_exprContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.array_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArray_literal?: (ctx: Array_literalContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.tuple_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTuple_expr?: (ctx: Tuple_exprContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.range_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRange_expr?: (ctx: Range_exprContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.u32_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitU32_expr?: (ctx: U32_exprContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.str_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStr_expr?: (ctx: Str_exprContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.bool_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBool_expr?: (ctx: Bool_exprContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.type`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitType?: (ctx: TypeContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.type_list_opt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitType_list_opt?: (ctx: Type_list_optContext) => Result;
}

