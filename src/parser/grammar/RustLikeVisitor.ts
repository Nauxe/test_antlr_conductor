// Generated from grammar/RustLike.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


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
     * Visit a parse tree produced by `RustLikeParser.expr_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpr_stmt?: (ctx: Expr_stmtContext) => Result;
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
     * Visit a parse tree produced by `RustLikeParser.bool_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBool_stmt?: (ctx: Bool_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.while_loop`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWhile_loop?: (ctx: While_loopContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.for_loop`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFor_loop?: (ctx: For_loopContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlock?: (ctx: BlockContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.int_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInt_expr?: (ctx: Int_exprContext) => Result;
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
     * Visit a parse tree produced by `RustLikeParser.tuple`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTuple?: (ctx: TupleContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.expr_list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpr_list?: (ctx: Expr_listContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpr?: (ctx: ExprContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.type`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitType?: (ctx: TypeContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.type_list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitType_list?: (ctx: Type_listContext) => Result;
    /**
     * Visit a parse tree produced by `RustLikeParser.tuple_type`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTuple_type?: (ctx: Tuple_typeContext) => Result;
}

