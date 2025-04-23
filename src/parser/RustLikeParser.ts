// Generated from grammar/RustLike.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { RustLikeListener } from "./RustLikeListener.js";
import { RustLikeVisitor } from "./RustLikeVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class RustLikeParser extends antlr.Parser {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly T__2 = 3;
    public static readonly T__3 = 4;
    public static readonly T__4 = 5;
    public static readonly T__5 = 6;
    public static readonly T__6 = 7;
    public static readonly T__7 = 8;
    public static readonly T__8 = 9;
    public static readonly T__9 = 10;
    public static readonly T__10 = 11;
    public static readonly T__11 = 12;
    public static readonly T__12 = 13;
    public static readonly T__13 = 14;
    public static readonly T__14 = 15;
    public static readonly T__15 = 16;
    public static readonly T__16 = 17;
    public static readonly T__17 = 18;
    public static readonly T__18 = 19;
    public static readonly T__19 = 20;
    public static readonly T__20 = 21;
    public static readonly T__21 = 22;
    public static readonly T__22 = 23;
    public static readonly T__23 = 24;
    public static readonly U32 = 25;
    public static readonly STRING = 26;
    public static readonly IDENTIFIER = 27;
    public static readonly BOOL = 28;
    public static readonly INT_OP = 29;
    public static readonly BOOL_BINOP = 30;
    public static readonly BOOL_OP = 31;
    public static readonly WS = 32;
    public static readonly LINE_COMMENT = 33;
    public static readonly RULE_prog = 0;
    public static readonly RULE_stmt_list = 1;
    public static readonly RULE_stmt = 2;
    public static readonly RULE_decl = 3;
    public static readonly RULE_fn_decl = 4;
    public static readonly RULE_param_list_opt = 5;
    public static readonly RULE_param_list = 6;
    public static readonly RULE_param = 7;
    public static readonly RULE_print_stmt = 8;
    public static readonly RULE_break_stmt = 9;
    public static readonly RULE_continue_stmt = 10;
    public static readonly RULE_expr_stmt = 11;
    public static readonly RULE_if_stmt = 12;
    public static readonly RULE_while_loop = 13;
    public static readonly RULE_block = 14;
    public static readonly RULE_expr = 15;
    public static readonly RULE_primary = 16;
    public static readonly RULE_arg_list_opt = 17;
    public static readonly RULE_if_expr = 18;
    public static readonly RULE_array_literal = 19;
    public static readonly RULE_tuple_expr = 20;
    public static readonly RULE_range_expr = 21;
    public static readonly RULE_u32_expr = 22;
    public static readonly RULE_str_expr = 23;
    public static readonly RULE_bool_expr = 24;
    public static readonly RULE_type = 25;
    public static readonly RULE_type_list_opt = 26;

    public static readonly literalNames = [
        null, "'let'", "':'", "'='", "';'", "'fn'", "'('", "')'", "'->'", 
        "','", "'print!'", "'break'", "'continue'", "'if'", "'else'", "'while'", 
        "'{'", "'}'", "'['", "']'", "'..'", "'+'", "'()'", "'u32'", "'string'", 
        null, null, null, null, null, null, "'!'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, "U32", "STRING", "IDENTIFIER", "BOOL", "INT_OP", 
        "BOOL_BINOP", "BOOL_OP", "WS", "LINE_COMMENT"
    ];
    public static readonly ruleNames = [
        "prog", "stmt_list", "stmt", "decl", "fn_decl", "param_list_opt", 
        "param_list", "param", "print_stmt", "break_stmt", "continue_stmt", 
        "expr_stmt", "if_stmt", "while_loop", "block", "expr", "primary", 
        "arg_list_opt", "if_expr", "array_literal", "tuple_expr", "range_expr", 
        "u32_expr", "str_expr", "bool_expr", "type", "type_list_opt",
    ];

    public get grammarFileName(): string { return "RustLike.g4"; }
    public get literalNames(): (string | null)[] { return RustLikeParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return RustLikeParser.symbolicNames; }
    public get ruleNames(): string[] { return RustLikeParser.ruleNames; }
    public get serializedATN(): number[] { return RustLikeParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, RustLikeParser._ATN, RustLikeParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public prog(): ProgContext {
        let localContext = new ProgContext(this.context, this.state);
        this.enterRule(localContext, 0, RustLikeParser.RULE_prog);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 54;
            this.stmt_list();
            this.state = 55;
            this.match(RustLikeParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public stmt_list(): Stmt_listContext {
        let localContext = new Stmt_listContext(this.context, this.state);
        this.enterRule(localContext, 2, RustLikeParser.RULE_stmt_list);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 58;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 57;
                this.stmt();
                }
                }
                this.state = 60;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2651176034) !== 0));
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public stmt(): StmtContext {
        let localContext = new StmtContext(this.context, this.state);
        this.enterRule(localContext, 4, RustLikeParser.RULE_stmt);
        try {
            this.state = 71;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 62;
                this.decl();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 63;
                this.fn_decl();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 64;
                this.print_stmt();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 65;
                this.if_stmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 66;
                this.while_loop();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 67;
                this.break_stmt();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 68;
                this.continue_stmt();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 69;
                this.expr_stmt();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 70;
                this.block();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public decl(): DeclContext {
        let localContext = new DeclContext(this.context, this.state);
        this.enterRule(localContext, 6, RustLikeParser.RULE_decl);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 73;
            this.match(RustLikeParser.T__0);
            this.state = 74;
            this.match(RustLikeParser.IDENTIFIER);
            this.state = 75;
            this.match(RustLikeParser.T__1);
            this.state = 76;
            this.type_();
            this.state = 77;
            this.match(RustLikeParser.T__2);
            this.state = 78;
            this.expr(0);
            this.state = 79;
            this.match(RustLikeParser.T__3);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fn_decl(): Fn_declContext {
        let localContext = new Fn_declContext(this.context, this.state);
        this.enterRule(localContext, 8, RustLikeParser.RULE_fn_decl);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 81;
            this.match(RustLikeParser.T__4);
            this.state = 82;
            this.match(RustLikeParser.IDENTIFIER);
            this.state = 83;
            this.match(RustLikeParser.T__5);
            this.state = 84;
            this.param_list_opt();
            this.state = 85;
            this.match(RustLikeParser.T__6);
            this.state = 86;
            this.match(RustLikeParser.T__7);
            this.state = 87;
            this.type_();
            this.state = 88;
            this.block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public param_list_opt(): Param_list_optContext {
        let localContext = new Param_list_optContext(this.context, this.state);
        this.enterRule(localContext, 10, RustLikeParser.RULE_param_list_opt);
        try {
            this.state = 92;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustLikeParser.T__6:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case RustLikeParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 91;
                this.param_list();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public param_list(): Param_listContext {
        let localContext = new Param_listContext(this.context, this.state);
        this.enterRule(localContext, 12, RustLikeParser.RULE_param_list);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 94;
            this.param();
            this.state = 99;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 9) {
                {
                {
                this.state = 95;
                this.match(RustLikeParser.T__8);
                this.state = 96;
                this.param();
                }
                }
                this.state = 101;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public param(): ParamContext {
        let localContext = new ParamContext(this.context, this.state);
        this.enterRule(localContext, 14, RustLikeParser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 102;
            this.match(RustLikeParser.IDENTIFIER);
            this.state = 103;
            this.match(RustLikeParser.T__1);
            this.state = 104;
            this.type_();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public print_stmt(): Print_stmtContext {
        let localContext = new Print_stmtContext(this.context, this.state);
        this.enterRule(localContext, 16, RustLikeParser.RULE_print_stmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 106;
            this.match(RustLikeParser.T__9);
            this.state = 107;
            this.match(RustLikeParser.T__5);
            this.state = 108;
            this.expr(0);
            this.state = 109;
            this.match(RustLikeParser.T__6);
            this.state = 110;
            this.match(RustLikeParser.T__3);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public break_stmt(): Break_stmtContext {
        let localContext = new Break_stmtContext(this.context, this.state);
        this.enterRule(localContext, 18, RustLikeParser.RULE_break_stmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 112;
            this.match(RustLikeParser.T__10);
            this.state = 113;
            this.match(RustLikeParser.T__3);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public continue_stmt(): Continue_stmtContext {
        let localContext = new Continue_stmtContext(this.context, this.state);
        this.enterRule(localContext, 20, RustLikeParser.RULE_continue_stmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 115;
            this.match(RustLikeParser.T__11);
            this.state = 116;
            this.match(RustLikeParser.T__3);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr_stmt(): Expr_stmtContext {
        let localContext = new Expr_stmtContext(this.context, this.state);
        this.enterRule(localContext, 22, RustLikeParser.RULE_expr_stmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 118;
            this.expr(0);
            this.state = 119;
            this.match(RustLikeParser.T__3);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public if_stmt(): If_stmtContext {
        let localContext = new If_stmtContext(this.context, this.state);
        this.enterRule(localContext, 24, RustLikeParser.RULE_if_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 121;
            this.match(RustLikeParser.T__12);
            this.state = 122;
            this.expr(0);
            this.state = 123;
            this.block();
            this.state = 126;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 14) {
                {
                this.state = 124;
                this.match(RustLikeParser.T__13);
                this.state = 125;
                this.block();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public while_loop(): While_loopContext {
        let localContext = new While_loopContext(this.context, this.state);
        this.enterRule(localContext, 26, RustLikeParser.RULE_while_loop);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 128;
            this.match(RustLikeParser.T__14);
            this.state = 129;
            this.expr(0);
            this.state = 130;
            this.block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public block(): BlockContext {
        let localContext = new BlockContext(this.context, this.state);
        this.enterRule(localContext, 28, RustLikeParser.RULE_block);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 132;
            this.match(RustLikeParser.T__15);
            this.state = 133;
            this.stmt_list();
            this.state = 134;
            this.match(RustLikeParser.T__16);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public expr(): ExprContext;
    public expr(_p: number): ExprContext;
    public expr(_p?: number): ExprContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ExprContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 30;
        this.enterRecursionRule(localContext, 30, RustLikeParser.RULE_expr, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 140;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustLikeParser.BOOL_OP:
                {
                localContext = new UnaryExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 137;
                this.match(RustLikeParser.BOOL_OP);
                this.state = 138;
                this.expr(6);
                }
                break;
            case RustLikeParser.T__5:
            case RustLikeParser.T__12:
            case RustLikeParser.T__17:
            case RustLikeParser.U32:
            case RustLikeParser.STRING:
            case RustLikeParser.IDENTIFIER:
            case RustLikeParser.BOOL:
                {
                localContext = new PrimaryExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 139;
                this.primary();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 160;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 158;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
                    case 1:
                        {
                        localContext = new BinaryOpExprContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustLikeParser.RULE_expr);
                        this.state = 142;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 143;
                        this.match(RustLikeParser.INT_OP);
                        this.state = 144;
                        this.expr(4);
                        }
                        break;
                    case 2:
                        {
                        localContext = new LogicalExprContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustLikeParser.RULE_expr);
                        this.state = 145;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 146;
                        this.match(RustLikeParser.BOOL_BINOP);
                        this.state = 147;
                        this.expr(3);
                        }
                        break;
                    case 3:
                        {
                        localContext = new IndexExprContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustLikeParser.RULE_expr);
                        this.state = 148;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 149;
                        this.match(RustLikeParser.T__17);
                        this.state = 150;
                        this.expr(0);
                        this.state = 151;
                        this.match(RustLikeParser.T__18);
                        }
                        break;
                    case 4:
                        {
                        localContext = new CallExprContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustLikeParser.RULE_expr);
                        this.state = 153;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 154;
                        this.match(RustLikeParser.T__5);
                        this.state = 155;
                        this.arg_list_opt();
                        this.state = 156;
                        this.match(RustLikeParser.T__6);
                        }
                        break;
                    }
                    }
                }
                this.state = 162;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public primary(): PrimaryContext {
        let localContext = new PrimaryContext(this.context, this.state);
        this.enterRule(localContext, 32, RustLikeParser.RULE_primary);
        try {
            this.state = 175;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 163;
                this.u32_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 164;
                this.str_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 165;
                this.bool_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 166;
                this.match(RustLikeParser.IDENTIFIER);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 167;
                this.match(RustLikeParser.T__5);
                this.state = 168;
                this.expr(0);
                this.state = 169;
                this.match(RustLikeParser.T__6);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 171;
                this.if_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 172;
                this.array_literal();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 173;
                this.tuple_expr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 174;
                this.range_expr();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arg_list_opt(): Arg_list_optContext {
        let localContext = new Arg_list_optContext(this.context, this.state);
        this.enterRule(localContext, 34, RustLikeParser.RULE_arg_list_opt);
        let _la: number;
        try {
            this.state = 186;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustLikeParser.T__6:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case RustLikeParser.T__5:
            case RustLikeParser.T__12:
            case RustLikeParser.T__17:
            case RustLikeParser.U32:
            case RustLikeParser.STRING:
            case RustLikeParser.IDENTIFIER:
            case RustLikeParser.BOOL:
            case RustLikeParser.BOOL_OP:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 178;
                this.expr(0);
                this.state = 183;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 9) {
                    {
                    {
                    this.state = 179;
                    this.match(RustLikeParser.T__8);
                    this.state = 180;
                    this.expr(0);
                    }
                    }
                    this.state = 185;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public if_expr(): If_exprContext {
        let localContext = new If_exprContext(this.context, this.state);
        this.enterRule(localContext, 36, RustLikeParser.RULE_if_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 188;
            this.match(RustLikeParser.T__12);
            this.state = 189;
            this.expr(0);
            this.state = 190;
            this.block();
            this.state = 193;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                {
                this.state = 191;
                this.match(RustLikeParser.T__13);
                this.state = 192;
                this.block();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public array_literal(): Array_literalContext {
        let localContext = new Array_literalContext(this.context, this.state);
        this.enterRule(localContext, 38, RustLikeParser.RULE_array_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 195;
            this.match(RustLikeParser.T__17);
            this.state = 204;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2651070528) !== 0)) {
                {
                this.state = 196;
                this.expr(0);
                this.state = 201;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 9) {
                    {
                    {
                    this.state = 197;
                    this.match(RustLikeParser.T__8);
                    this.state = 198;
                    this.expr(0);
                    }
                    }
                    this.state = 203;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 206;
            this.match(RustLikeParser.T__18);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tuple_expr(): Tuple_exprContext {
        let localContext = new Tuple_exprContext(this.context, this.state);
        this.enterRule(localContext, 40, RustLikeParser.RULE_tuple_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 208;
            this.match(RustLikeParser.T__5);
            this.state = 217;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2651070528) !== 0)) {
                {
                this.state = 209;
                this.expr(0);
                this.state = 214;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 9) {
                    {
                    {
                    this.state = 210;
                    this.match(RustLikeParser.T__8);
                    this.state = 211;
                    this.expr(0);
                    }
                    }
                    this.state = 216;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 219;
            this.match(RustLikeParser.T__6);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public range_expr(): Range_exprContext {
        let localContext = new Range_exprContext(this.context, this.state);
        this.enterRule(localContext, 42, RustLikeParser.RULE_range_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 221;
            this.u32_expr();
            this.state = 222;
            this.match(RustLikeParser.T__19);
            this.state = 223;
            this.u32_expr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public u32_expr(): U32_exprContext {
        let localContext = new U32_exprContext(this.context, this.state);
        this.enterRule(localContext, 44, RustLikeParser.RULE_u32_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 225;
            this.match(RustLikeParser.U32);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public str_expr(): Str_exprContext {
        let localContext = new Str_exprContext(this.context, this.state);
        this.enterRule(localContext, 46, RustLikeParser.RULE_str_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 227;
            this.match(RustLikeParser.STRING);
            this.state = 230;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
            case 1:
                {
                this.state = 228;
                this.match(RustLikeParser.T__20);
                this.state = 229;
                this.match(RustLikeParser.STRING);
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public bool_expr(): Bool_exprContext {
        let localContext = new Bool_exprContext(this.context, this.state);
        this.enterRule(localContext, 48, RustLikeParser.RULE_bool_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 232;
            this.match(RustLikeParser.BOOL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public type_(): TypeContext {
        let localContext = new TypeContext(this.context, this.state);
        this.enterRule(localContext, 50, RustLikeParser.RULE_type);
        try {
            this.state = 244;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustLikeParser.T__21:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 234;
                this.match(RustLikeParser.T__21);
                }
                break;
            case RustLikeParser.T__22:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 235;
                this.match(RustLikeParser.T__22);
                }
                break;
            case RustLikeParser.T__23:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 236;
                this.match(RustLikeParser.T__23);
                }
                break;
            case RustLikeParser.T__4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 237;
                this.match(RustLikeParser.T__4);
                this.state = 238;
                this.match(RustLikeParser.T__5);
                this.state = 239;
                this.type_list_opt();
                this.state = 240;
                this.match(RustLikeParser.T__6);
                this.state = 241;
                this.match(RustLikeParser.T__7);
                this.state = 242;
                this.type_();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public type_list_opt(): Type_list_optContext {
        let localContext = new Type_list_optContext(this.context, this.state);
        this.enterRule(localContext, 52, RustLikeParser.RULE_type_list_opt);
        let _la: number;
        try {
            this.state = 255;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustLikeParser.T__6:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case RustLikeParser.T__4:
            case RustLikeParser.T__21:
            case RustLikeParser.T__22:
            case RustLikeParser.T__23:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 247;
                this.type_();
                this.state = 252;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 9) {
                    {
                    {
                    this.state = 248;
                    this.match(RustLikeParser.T__8);
                    this.state = 249;
                    this.type_();
                    }
                    }
                    this.state = 254;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 15:
            return this.expr_sempred(localContext as ExprContext, predIndex);
        }
        return true;
    }
    private expr_sempred(localContext: ExprContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 3);
        case 1:
            return this.precpred(this.context, 2);
        case 2:
            return this.precpred(this.context, 5);
        case 3:
            return this.precpred(this.context, 4);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,33,258,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        1,0,1,0,1,0,1,1,4,1,59,8,1,11,1,12,1,60,1,2,1,2,1,2,1,2,1,2,1,2,
        1,2,1,2,1,2,3,2,72,8,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,
        4,1,4,1,4,1,4,1,4,1,4,1,4,1,5,1,5,3,5,93,8,5,1,6,1,6,1,6,5,6,98,
        8,6,10,6,12,6,101,9,6,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,1,
        9,1,9,1,9,1,10,1,10,1,10,1,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,
        3,12,127,8,12,1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,15,1,15,
        1,15,1,15,3,15,141,8,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,
        1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,5,15,159,8,15,10,15,12,15,
        162,9,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,
        1,16,3,16,176,8,16,1,17,1,17,1,17,1,17,5,17,182,8,17,10,17,12,17,
        185,9,17,3,17,187,8,17,1,18,1,18,1,18,1,18,1,18,3,18,194,8,18,1,
        19,1,19,1,19,1,19,5,19,200,8,19,10,19,12,19,203,9,19,3,19,205,8,
        19,1,19,1,19,1,20,1,20,1,20,1,20,5,20,213,8,20,10,20,12,20,216,9,
        20,3,20,218,8,20,1,20,1,20,1,21,1,21,1,21,1,21,1,22,1,22,1,23,1,
        23,1,23,3,23,231,8,23,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,25,1,
        25,1,25,1,25,1,25,3,25,245,8,25,1,26,1,26,1,26,1,26,5,26,251,8,26,
        10,26,12,26,254,9,26,3,26,256,8,26,1,26,0,1,30,27,0,2,4,6,8,10,12,
        14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,0,0,
        268,0,54,1,0,0,0,2,58,1,0,0,0,4,71,1,0,0,0,6,73,1,0,0,0,8,81,1,0,
        0,0,10,92,1,0,0,0,12,94,1,0,0,0,14,102,1,0,0,0,16,106,1,0,0,0,18,
        112,1,0,0,0,20,115,1,0,0,0,22,118,1,0,0,0,24,121,1,0,0,0,26,128,
        1,0,0,0,28,132,1,0,0,0,30,140,1,0,0,0,32,175,1,0,0,0,34,186,1,0,
        0,0,36,188,1,0,0,0,38,195,1,0,0,0,40,208,1,0,0,0,42,221,1,0,0,0,
        44,225,1,0,0,0,46,227,1,0,0,0,48,232,1,0,0,0,50,244,1,0,0,0,52,255,
        1,0,0,0,54,55,3,2,1,0,55,56,5,0,0,1,56,1,1,0,0,0,57,59,3,4,2,0,58,
        57,1,0,0,0,59,60,1,0,0,0,60,58,1,0,0,0,60,61,1,0,0,0,61,3,1,0,0,
        0,62,72,3,6,3,0,63,72,3,8,4,0,64,72,3,16,8,0,65,72,3,24,12,0,66,
        72,3,26,13,0,67,72,3,18,9,0,68,72,3,20,10,0,69,72,3,22,11,0,70,72,
        3,28,14,0,71,62,1,0,0,0,71,63,1,0,0,0,71,64,1,0,0,0,71,65,1,0,0,
        0,71,66,1,0,0,0,71,67,1,0,0,0,71,68,1,0,0,0,71,69,1,0,0,0,71,70,
        1,0,0,0,72,5,1,0,0,0,73,74,5,1,0,0,74,75,5,27,0,0,75,76,5,2,0,0,
        76,77,3,50,25,0,77,78,5,3,0,0,78,79,3,30,15,0,79,80,5,4,0,0,80,7,
        1,0,0,0,81,82,5,5,0,0,82,83,5,27,0,0,83,84,5,6,0,0,84,85,3,10,5,
        0,85,86,5,7,0,0,86,87,5,8,0,0,87,88,3,50,25,0,88,89,3,28,14,0,89,
        9,1,0,0,0,90,93,1,0,0,0,91,93,3,12,6,0,92,90,1,0,0,0,92,91,1,0,0,
        0,93,11,1,0,0,0,94,99,3,14,7,0,95,96,5,9,0,0,96,98,3,14,7,0,97,95,
        1,0,0,0,98,101,1,0,0,0,99,97,1,0,0,0,99,100,1,0,0,0,100,13,1,0,0,
        0,101,99,1,0,0,0,102,103,5,27,0,0,103,104,5,2,0,0,104,105,3,50,25,
        0,105,15,1,0,0,0,106,107,5,10,0,0,107,108,5,6,0,0,108,109,3,30,15,
        0,109,110,5,7,0,0,110,111,5,4,0,0,111,17,1,0,0,0,112,113,5,11,0,
        0,113,114,5,4,0,0,114,19,1,0,0,0,115,116,5,12,0,0,116,117,5,4,0,
        0,117,21,1,0,0,0,118,119,3,30,15,0,119,120,5,4,0,0,120,23,1,0,0,
        0,121,122,5,13,0,0,122,123,3,30,15,0,123,126,3,28,14,0,124,125,5,
        14,0,0,125,127,3,28,14,0,126,124,1,0,0,0,126,127,1,0,0,0,127,25,
        1,0,0,0,128,129,5,15,0,0,129,130,3,30,15,0,130,131,3,28,14,0,131,
        27,1,0,0,0,132,133,5,16,0,0,133,134,3,2,1,0,134,135,5,17,0,0,135,
        29,1,0,0,0,136,137,6,15,-1,0,137,138,5,31,0,0,138,141,3,30,15,6,
        139,141,3,32,16,0,140,136,1,0,0,0,140,139,1,0,0,0,141,160,1,0,0,
        0,142,143,10,3,0,0,143,144,5,29,0,0,144,159,3,30,15,4,145,146,10,
        2,0,0,146,147,5,30,0,0,147,159,3,30,15,3,148,149,10,5,0,0,149,150,
        5,18,0,0,150,151,3,30,15,0,151,152,5,19,0,0,152,159,1,0,0,0,153,
        154,10,4,0,0,154,155,5,6,0,0,155,156,3,34,17,0,156,157,5,7,0,0,157,
        159,1,0,0,0,158,142,1,0,0,0,158,145,1,0,0,0,158,148,1,0,0,0,158,
        153,1,0,0,0,159,162,1,0,0,0,160,158,1,0,0,0,160,161,1,0,0,0,161,
        31,1,0,0,0,162,160,1,0,0,0,163,176,3,44,22,0,164,176,3,46,23,0,165,
        176,3,48,24,0,166,176,5,27,0,0,167,168,5,6,0,0,168,169,3,30,15,0,
        169,170,5,7,0,0,170,176,1,0,0,0,171,176,3,36,18,0,172,176,3,38,19,
        0,173,176,3,40,20,0,174,176,3,42,21,0,175,163,1,0,0,0,175,164,1,
        0,0,0,175,165,1,0,0,0,175,166,1,0,0,0,175,167,1,0,0,0,175,171,1,
        0,0,0,175,172,1,0,0,0,175,173,1,0,0,0,175,174,1,0,0,0,176,33,1,0,
        0,0,177,187,1,0,0,0,178,183,3,30,15,0,179,180,5,9,0,0,180,182,3,
        30,15,0,181,179,1,0,0,0,182,185,1,0,0,0,183,181,1,0,0,0,183,184,
        1,0,0,0,184,187,1,0,0,0,185,183,1,0,0,0,186,177,1,0,0,0,186,178,
        1,0,0,0,187,35,1,0,0,0,188,189,5,13,0,0,189,190,3,30,15,0,190,193,
        3,28,14,0,191,192,5,14,0,0,192,194,3,28,14,0,193,191,1,0,0,0,193,
        194,1,0,0,0,194,37,1,0,0,0,195,204,5,18,0,0,196,201,3,30,15,0,197,
        198,5,9,0,0,198,200,3,30,15,0,199,197,1,0,0,0,200,203,1,0,0,0,201,
        199,1,0,0,0,201,202,1,0,0,0,202,205,1,0,0,0,203,201,1,0,0,0,204,
        196,1,0,0,0,204,205,1,0,0,0,205,206,1,0,0,0,206,207,5,19,0,0,207,
        39,1,0,0,0,208,217,5,6,0,0,209,214,3,30,15,0,210,211,5,9,0,0,211,
        213,3,30,15,0,212,210,1,0,0,0,213,216,1,0,0,0,214,212,1,0,0,0,214,
        215,1,0,0,0,215,218,1,0,0,0,216,214,1,0,0,0,217,209,1,0,0,0,217,
        218,1,0,0,0,218,219,1,0,0,0,219,220,5,7,0,0,220,41,1,0,0,0,221,222,
        3,44,22,0,222,223,5,20,0,0,223,224,3,44,22,0,224,43,1,0,0,0,225,
        226,5,25,0,0,226,45,1,0,0,0,227,230,5,26,0,0,228,229,5,21,0,0,229,
        231,5,26,0,0,230,228,1,0,0,0,230,231,1,0,0,0,231,47,1,0,0,0,232,
        233,5,28,0,0,233,49,1,0,0,0,234,245,5,22,0,0,235,245,5,23,0,0,236,
        245,5,24,0,0,237,238,5,5,0,0,238,239,5,6,0,0,239,240,3,52,26,0,240,
        241,5,7,0,0,241,242,5,8,0,0,242,243,3,50,25,0,243,245,1,0,0,0,244,
        234,1,0,0,0,244,235,1,0,0,0,244,236,1,0,0,0,244,237,1,0,0,0,245,
        51,1,0,0,0,246,256,1,0,0,0,247,252,3,50,25,0,248,249,5,9,0,0,249,
        251,3,50,25,0,250,248,1,0,0,0,251,254,1,0,0,0,252,250,1,0,0,0,252,
        253,1,0,0,0,253,256,1,0,0,0,254,252,1,0,0,0,255,246,1,0,0,0,255,
        247,1,0,0,0,256,53,1,0,0,0,20,60,71,92,99,126,140,158,160,175,183,
        186,193,201,204,214,217,230,244,252,255
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!RustLikeParser.__ATN) {
            RustLikeParser.__ATN = new antlr.ATNDeserializer().deserialize(RustLikeParser._serializedATN);
        }

        return RustLikeParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(RustLikeParser.literalNames, RustLikeParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return RustLikeParser.vocabulary;
    }

    private static readonly decisionsToDFA = RustLikeParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public stmt_list(): Stmt_listContext {
        return this.getRuleContext(0, Stmt_listContext)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(RustLikeParser.EOF, 0)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_prog;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterProg) {
             listener.enterProg(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitProg) {
             listener.exitProg(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitProg) {
            return visitor.visitProg(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Stmt_listContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public stmt(): StmtContext[];
    public stmt(i: number): StmtContext | null;
    public stmt(i?: number): StmtContext[] | StmtContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StmtContext);
        }

        return this.getRuleContext(i, StmtContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_stmt_list;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterStmt_list) {
             listener.enterStmt_list(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitStmt_list) {
             listener.exitStmt_list(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitStmt_list) {
            return visitor.visitStmt_list(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public decl(): DeclContext | null {
        return this.getRuleContext(0, DeclContext);
    }
    public fn_decl(): Fn_declContext | null {
        return this.getRuleContext(0, Fn_declContext);
    }
    public print_stmt(): Print_stmtContext | null {
        return this.getRuleContext(0, Print_stmtContext);
    }
    public if_stmt(): If_stmtContext | null {
        return this.getRuleContext(0, If_stmtContext);
    }
    public while_loop(): While_loopContext | null {
        return this.getRuleContext(0, While_loopContext);
    }
    public break_stmt(): Break_stmtContext | null {
        return this.getRuleContext(0, Break_stmtContext);
    }
    public continue_stmt(): Continue_stmtContext | null {
        return this.getRuleContext(0, Continue_stmtContext);
    }
    public expr_stmt(): Expr_stmtContext | null {
        return this.getRuleContext(0, Expr_stmtContext);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_stmt;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterStmt) {
             listener.enterStmt(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitStmt) {
             listener.exitStmt(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitStmt) {
            return visitor.visitStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RustLikeParser.IDENTIFIER, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_decl;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterDecl) {
             listener.enterDecl(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitDecl) {
             listener.exitDecl(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitDecl) {
            return visitor.visitDecl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Fn_declContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RustLikeParser.IDENTIFIER, 0)!;
    }
    public param_list_opt(): Param_list_optContext {
        return this.getRuleContext(0, Param_list_optContext)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_fn_decl;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterFn_decl) {
             listener.enterFn_decl(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitFn_decl) {
             listener.exitFn_decl(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitFn_decl) {
            return visitor.visitFn_decl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Param_list_optContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public param_list(): Param_listContext | null {
        return this.getRuleContext(0, Param_listContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_param_list_opt;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterParam_list_opt) {
             listener.enterParam_list_opt(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitParam_list_opt) {
             listener.exitParam_list_opt(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitParam_list_opt) {
            return visitor.visitParam_list_opt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Param_listContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public param(): ParamContext[];
    public param(i: number): ParamContext | null;
    public param(i?: number): ParamContext[] | ParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ParamContext);
        }

        return this.getRuleContext(i, ParamContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_param_list;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterParam_list) {
             listener.enterParam_list(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitParam_list) {
             listener.exitParam_list(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitParam_list) {
            return visitor.visitParam_list(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RustLikeParser.IDENTIFIER, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_param;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitParam) {
             listener.exitParam(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitParam) {
            return visitor.visitParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Print_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_print_stmt;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterPrint_stmt) {
             listener.enterPrint_stmt(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitPrint_stmt) {
             listener.exitPrint_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitPrint_stmt) {
            return visitor.visitPrint_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Break_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_break_stmt;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterBreak_stmt) {
             listener.enterBreak_stmt(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitBreak_stmt) {
             listener.exitBreak_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitBreak_stmt) {
            return visitor.visitBreak_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Continue_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_continue_stmt;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterContinue_stmt) {
             listener.enterContinue_stmt(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitContinue_stmt) {
             listener.exitContinue_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitContinue_stmt) {
            return visitor.visitContinue_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_expr_stmt;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterExpr_stmt) {
             listener.enterExpr_stmt(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitExpr_stmt) {
             listener.exitExpr_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitExpr_stmt) {
            return visitor.visitExpr_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class If_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public block(): BlockContext[];
    public block(i: number): BlockContext | null;
    public block(i?: number): BlockContext[] | BlockContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BlockContext);
        }

        return this.getRuleContext(i, BlockContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_if_stmt;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterIf_stmt) {
             listener.enterIf_stmt(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitIf_stmt) {
             listener.exitIf_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitIf_stmt) {
            return visitor.visitIf_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class While_loopContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_while_loop;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterWhile_loop) {
             listener.enterWhile_loop(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitWhile_loop) {
             listener.exitWhile_loop(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitWhile_loop) {
            return visitor.visitWhile_loop(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public stmt_list(): Stmt_listContext {
        return this.getRuleContext(0, Stmt_listContext)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_block;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitBlock) {
            return visitor.visitBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_expr;
    }
    public override copyFrom(ctx: ExprContext): void {
        super.copyFrom(ctx);
    }
}
export class IndexExprContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterIndexExpr) {
             listener.enterIndexExpr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitIndexExpr) {
             listener.exitIndexExpr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitIndexExpr) {
            return visitor.visitIndexExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class UnaryExprContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public BOOL_OP(): antlr.TerminalNode {
        return this.getToken(RustLikeParser.BOOL_OP, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterUnaryExpr) {
             listener.enterUnaryExpr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitUnaryExpr) {
             listener.exitUnaryExpr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitUnaryExpr) {
            return visitor.visitUnaryExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PrimaryExprContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public primary(): PrimaryContext {
        return this.getRuleContext(0, PrimaryContext)!;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterPrimaryExpr) {
             listener.enterPrimaryExpr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitPrimaryExpr) {
             listener.exitPrimaryExpr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitPrimaryExpr) {
            return visitor.visitPrimaryExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LogicalExprContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public BOOL_BINOP(): antlr.TerminalNode {
        return this.getToken(RustLikeParser.BOOL_BINOP, 0)!;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterLogicalExpr) {
             listener.enterLogicalExpr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitLogicalExpr) {
             listener.exitLogicalExpr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitLogicalExpr) {
            return visitor.visitLogicalExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class BinaryOpExprContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public INT_OP(): antlr.TerminalNode {
        return this.getToken(RustLikeParser.INT_OP, 0)!;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterBinaryOpExpr) {
             listener.enterBinaryOpExpr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitBinaryOpExpr) {
             listener.exitBinaryOpExpr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitBinaryOpExpr) {
            return visitor.visitBinaryOpExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CallExprContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public arg_list_opt(): Arg_list_optContext {
        return this.getRuleContext(0, Arg_list_optContext)!;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterCallExpr) {
             listener.enterCallExpr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitCallExpr) {
             listener.exitCallExpr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitCallExpr) {
            return visitor.visitCallExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PrimaryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public u32_expr(): U32_exprContext | null {
        return this.getRuleContext(0, U32_exprContext);
    }
    public str_expr(): Str_exprContext | null {
        return this.getRuleContext(0, Str_exprContext);
    }
    public bool_expr(): Bool_exprContext | null {
        return this.getRuleContext(0, Bool_exprContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(RustLikeParser.IDENTIFIER, 0);
    }
    public expr(): ExprContext | null {
        return this.getRuleContext(0, ExprContext);
    }
    public if_expr(): If_exprContext | null {
        return this.getRuleContext(0, If_exprContext);
    }
    public array_literal(): Array_literalContext | null {
        return this.getRuleContext(0, Array_literalContext);
    }
    public tuple_expr(): Tuple_exprContext | null {
        return this.getRuleContext(0, Tuple_exprContext);
    }
    public range_expr(): Range_exprContext | null {
        return this.getRuleContext(0, Range_exprContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_primary;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterPrimary) {
             listener.enterPrimary(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitPrimary) {
             listener.exitPrimary(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitPrimary) {
            return visitor.visitPrimary(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Arg_list_optContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_arg_list_opt;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterArg_list_opt) {
             listener.enterArg_list_opt(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitArg_list_opt) {
             listener.exitArg_list_opt(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitArg_list_opt) {
            return visitor.visitArg_list_opt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class If_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public block(): BlockContext[];
    public block(i: number): BlockContext | null;
    public block(i?: number): BlockContext[] | BlockContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BlockContext);
        }

        return this.getRuleContext(i, BlockContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_if_expr;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterIf_expr) {
             listener.enterIf_expr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitIf_expr) {
             listener.exitIf_expr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitIf_expr) {
            return visitor.visitIf_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Array_literalContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_array_literal;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterArray_literal) {
             listener.enterArray_literal(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitArray_literal) {
             listener.exitArray_literal(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitArray_literal) {
            return visitor.visitArray_literal(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Tuple_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_tuple_expr;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterTuple_expr) {
             listener.enterTuple_expr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitTuple_expr) {
             listener.exitTuple_expr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitTuple_expr) {
            return visitor.visitTuple_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Range_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public u32_expr(): U32_exprContext[];
    public u32_expr(i: number): U32_exprContext | null;
    public u32_expr(i?: number): U32_exprContext[] | U32_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(U32_exprContext);
        }

        return this.getRuleContext(i, U32_exprContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_range_expr;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterRange_expr) {
             listener.enterRange_expr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitRange_expr) {
             listener.exitRange_expr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitRange_expr) {
            return visitor.visitRange_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class U32_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public U32(): antlr.TerminalNode {
        return this.getToken(RustLikeParser.U32, 0)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_u32_expr;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterU32_expr) {
             listener.enterU32_expr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitU32_expr) {
             listener.exitU32_expr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitU32_expr) {
            return visitor.visitU32_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Str_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RustLikeParser.STRING);
    	} else {
    		return this.getToken(RustLikeParser.STRING, i);
    	}
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_str_expr;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterStr_expr) {
             listener.enterStr_expr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitStr_expr) {
             listener.exitStr_expr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitStr_expr) {
            return visitor.visitStr_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Bool_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BOOL(): antlr.TerminalNode {
        return this.getToken(RustLikeParser.BOOL, 0)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_bool_expr;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterBool_expr) {
             listener.enterBool_expr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitBool_expr) {
             listener.exitBool_expr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitBool_expr) {
            return visitor.visitBool_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public type_list_opt(): Type_list_optContext | null {
        return this.getRuleContext(0, Type_list_optContext);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_type;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterType) {
             listener.enterType(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitType) {
             listener.exitType(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitType) {
            return visitor.visitType(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Type_list_optContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public type_(): TypeContext[];
    public type_(i: number): TypeContext | null;
    public type_(i?: number): TypeContext[] | TypeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeContext);
        }

        return this.getRuleContext(i, TypeContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_type_list_opt;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterType_list_opt) {
             listener.enterType_list_opt(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitType_list_opt) {
             listener.exitType_list_opt(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitType_list_opt) {
            return visitor.visitType_list_opt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
