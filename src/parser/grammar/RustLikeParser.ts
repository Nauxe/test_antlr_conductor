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
    public static readonly T__24 = 25;
    public static readonly T__25 = 26;
    public static readonly T__26 = 27;
    public static readonly U32 = 28;
    public static readonly STRING = 29;
    public static readonly IDENTIFIER = 30;
    public static readonly BOOL = 31;
    public static readonly INT_OP = 32;
    public static readonly BOOL_BINOP = 33;
    public static readonly BOOL_OP = 34;
    public static readonly WS = 35;
    public static readonly LINE_COMMENT = 36;
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
    public static readonly RULE_block_stmt = 14;
    public static readonly RULE_block_expr = 15;
    public static readonly RULE_expr = 16;
    public static readonly RULE_primary = 17;
    public static readonly RULE_arg_list_opt = 18;
    public static readonly RULE_if_expr = 19;
    public static readonly RULE_array_literal = 20;
    public static readonly RULE_tuple_expr = 21;
    public static readonly RULE_range_expr = 22;
    public static readonly RULE_u32_expr = 23;
    public static readonly RULE_str_expr = 24;
    public static readonly RULE_bool_expr = 25;
    public static readonly RULE_type = 26;
    public static readonly RULE_type_list_opt = 27;

    public static readonly literalNames = [
        null, "'let'", "':'", "'='", "';'", "'fn'", "'('", "')'", "'->'", 
        "','", "'print!'", "'break'", "'continue'", "'if'", "'else'", "'while'", 
        "'{'", "'}'", "'&'", "'*'", "'['", "']'", "'..'", "'+'", "'()'", 
        "'u32'", "'bool'", "'string'", null, null, null, null, null, null, 
        "'!'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, "U32", "STRING", "IDENTIFIER", 
        "BOOL", "INT_OP", "BOOL_BINOP", "BOOL_OP", "WS", "LINE_COMMENT"
    ];
    public static readonly ruleNames = [
        "prog", "stmt_list", "stmt", "decl", "fn_decl", "param_list_opt", 
        "param_list", "param", "print_stmt", "break_stmt", "continue_stmt", 
        "expr_stmt", "if_stmt", "while_loop", "block_stmt", "block_expr", 
        "expr", "primary", "arg_list_opt", "if_expr", "array_literal", "tuple_expr", 
        "range_expr", "u32_expr", "str_expr", "bool_expr", "type", "type_list_opt",
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
            this.state = 62;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 56;
                this.block_expr();
                this.state = 57;
                this.match(RustLikeParser.EOF);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 59;
                this.block_stmt();
                this.state = 60;
                this.match(RustLikeParser.EOF);
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
    public stmt_list(): Stmt_listContext {
        let localContext = new Stmt_listContext(this.context, this.state);
        this.enterRule(localContext, 2, RustLikeParser.RULE_stmt_list);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 65;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 64;
                    this.stmt();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 67;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
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
            this.state = 78;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 69;
                this.decl();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 70;
                this.fn_decl();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 71;
                this.print_stmt();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 72;
                this.if_stmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 73;
                this.while_loop();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 74;
                this.break_stmt();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 75;
                this.continue_stmt();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 76;
                this.expr_stmt();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 77;
                this.block_stmt();
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
            this.state = 80;
            this.match(RustLikeParser.T__0);
            this.state = 81;
            this.match(RustLikeParser.IDENTIFIER);
            this.state = 82;
            this.match(RustLikeParser.T__1);
            this.state = 83;
            this.type_();
            this.state = 84;
            this.match(RustLikeParser.T__2);
            this.state = 85;
            this.expr(0);
            this.state = 86;
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
            this.state = 88;
            this.match(RustLikeParser.T__4);
            this.state = 89;
            this.match(RustLikeParser.IDENTIFIER);
            this.state = 90;
            this.match(RustLikeParser.T__5);
            this.state = 91;
            this.param_list_opt();
            this.state = 92;
            this.match(RustLikeParser.T__6);
            this.state = 93;
            this.match(RustLikeParser.T__7);
            this.state = 94;
            this.type_();
            this.state = 97;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                {
                this.state = 95;
                this.block_stmt();
                }
                break;
            case 2:
                {
                this.state = 96;
                this.block_expr();
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
    public param_list_opt(): Param_list_optContext {
        let localContext = new Param_list_optContext(this.context, this.state);
        this.enterRule(localContext, 10, RustLikeParser.RULE_param_list_opt);
        try {
            this.state = 101;
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
                this.state = 100;
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
            this.state = 103;
            this.param();
            this.state = 108;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 9) {
                {
                {
                this.state = 104;
                this.match(RustLikeParser.T__8);
                this.state = 105;
                this.param();
                }
                }
                this.state = 110;
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
            this.state = 111;
            this.match(RustLikeParser.IDENTIFIER);
            this.state = 112;
            this.match(RustLikeParser.T__1);
            this.state = 113;
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
            this.state = 115;
            this.match(RustLikeParser.T__9);
            this.state = 116;
            this.match(RustLikeParser.T__5);
            this.state = 117;
            this.expr(0);
            this.state = 118;
            this.match(RustLikeParser.T__6);
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
    public break_stmt(): Break_stmtContext {
        let localContext = new Break_stmtContext(this.context, this.state);
        this.enterRule(localContext, 18, RustLikeParser.RULE_break_stmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 121;
            this.match(RustLikeParser.T__10);
            this.state = 122;
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
            this.state = 124;
            this.match(RustLikeParser.T__11);
            this.state = 125;
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
            this.state = 127;
            this.expr(0);
            this.state = 128;
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
            this.state = 130;
            this.match(RustLikeParser.T__12);
            this.state = 131;
            this.expr(0);
            this.state = 132;
            this.block_stmt();
            this.state = 135;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 14) {
                {
                this.state = 133;
                this.match(RustLikeParser.T__13);
                this.state = 134;
                this.block_stmt();
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
            this.state = 137;
            this.match(RustLikeParser.T__14);
            this.state = 138;
            this.expr(0);
            this.state = 139;
            this.block_stmt();
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
    public block_stmt(): Block_stmtContext {
        let localContext = new Block_stmtContext(this.context, this.state);
        this.enterRule(localContext, 28, RustLikeParser.RULE_block_stmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 141;
            this.match(RustLikeParser.T__15);
            this.state = 142;
            this.stmt_list();
            this.state = 143;
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
    public block_expr(): Block_exprContext {
        let localContext = new Block_exprContext(this.context, this.state);
        this.enterRule(localContext, 30, RustLikeParser.RULE_block_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 145;
            this.match(RustLikeParser.T__15);
            this.state = 146;
            this.stmt_list();
            this.state = 148;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RustLikeParser.T__5) | (1 << RustLikeParser.T__12) | (1 << RustLikeParser.T__15) | (1 << RustLikeParser.T__17) | (1 << RustLikeParser.T__18) | (1 << RustLikeParser.T__19) | (1 << RustLikeParser.U32) | (1 << RustLikeParser.STRING) | (1 << RustLikeParser.IDENTIFIER) | (1 << RustLikeParser.BOOL))) !== 0) || _la === RustLikeParser.BOOL_OP) {
                {
                this.state = 147;
                this.expr(0);
                }
            }

            this.state = 149;
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
        let _startState = 32;
        this.enterRecursionRule(localContext, 32, RustLikeParser.RULE_expr, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 158;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustLikeParser.BOOL_OP:
                {
                localContext = new UnaryExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 151;
                this.match(RustLikeParser.BOOL_OP);
                this.state = 152;
                this.expr(8);
                }
                break;
            case RustLikeParser.T__17:
                {
                localContext = new RefExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 153;
                this.match(RustLikeParser.T__17);
                this.state = 154;
                this.expr(7);
                }
                break;
            case RustLikeParser.T__18:
                {
                localContext = new DerefExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 155;
                this.match(RustLikeParser.T__18);
                this.state = 156;
                this.expr(6);
                }
                break;
            case RustLikeParser.T__5:
            case RustLikeParser.T__12:
            case RustLikeParser.T__15:
            case RustLikeParser.T__19:
            case RustLikeParser.U32:
            case RustLikeParser.STRING:
            case RustLikeParser.IDENTIFIER:
            case RustLikeParser.BOOL:
                {
                localContext = new PrimaryExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 157;
                this.primary();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 178;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 176;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
                    case 1:
                        {
                        localContext = new BinaryOpExprContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustLikeParser.RULE_expr);
                        this.state = 160;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 161;
                        this.match(RustLikeParser.INT_OP);
                        this.state = 162;
                        this.expr(4);
                        }
                        break;
                    case 2:
                        {
                        localContext = new LogicalExprContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustLikeParser.RULE_expr);
                        this.state = 163;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 164;
                        this.match(RustLikeParser.BOOL_BINOP);
                        this.state = 165;
                        this.expr(3);
                        }
                        break;
                    case 3:
                        {
                        localContext = new IndexExprContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustLikeParser.RULE_expr);
                        this.state = 166;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 167;
                        this.match(RustLikeParser.T__19);
                        this.state = 168;
                        this.expr(0);
                        this.state = 169;
                        this.match(RustLikeParser.T__20);
                        }
                        break;
                    case 4:
                        {
                        localContext = new CallExprContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustLikeParser.RULE_expr);
                        this.state = 171;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 172;
                        this.match(RustLikeParser.T__5);
                        this.state = 173;
                        this.arg_list_opt();
                        this.state = 174;
                        this.match(RustLikeParser.T__6);
                        }
                        break;
                    }
                    }
                }
                this.state = 180;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
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
        this.enterRule(localContext, 34, RustLikeParser.RULE_primary);
        try {
            this.state = 194;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 181;
                this.u32_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 182;
                this.str_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 183;
                this.bool_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 184;
                this.match(RustLikeParser.IDENTIFIER);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 185;
                this.match(RustLikeParser.T__5);
                this.state = 186;
                this.expr(0);
                this.state = 187;
                this.match(RustLikeParser.T__6);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 189;
                this.if_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 190;
                this.array_literal();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 191;
                this.tuple_expr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 192;
                this.range_expr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 193;
                this.block_expr();
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
        this.enterRule(localContext, 36, RustLikeParser.RULE_arg_list_opt);
        let _la: number;
        try {
            this.state = 205;
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
            case RustLikeParser.T__15:
            case RustLikeParser.T__17:
            case RustLikeParser.T__18:
            case RustLikeParser.T__19:
            case RustLikeParser.U32:
            case RustLikeParser.STRING:
            case RustLikeParser.IDENTIFIER:
            case RustLikeParser.BOOL:
            case RustLikeParser.BOOL_OP:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 197;
                this.expr(0);
                this.state = 202;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 9) {
                    {
                    {
                    this.state = 198;
                    this.match(RustLikeParser.T__8);
                    this.state = 199;
                    this.expr(0);
                    }
                    }
                    this.state = 204;
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
        this.enterRule(localContext, 38, RustLikeParser.RULE_if_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 207;
            this.match(RustLikeParser.T__12);
            this.state = 208;
            this.expr(0);
            this.state = 209;
            this.block_expr();
            this.state = 212;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                {
                this.state = 210;
                this.match(RustLikeParser.T__13);
                this.state = 211;
                this.block_expr();
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
        this.enterRule(localContext, 40, RustLikeParser.RULE_array_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 214;
            this.match(RustLikeParser.T__19);
            this.state = 223;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 6)) & ~0x1F) === 0 && ((1 << (_la - 6)) & 331379841) !== 0)) {
                {
                this.state = 215;
                this.expr(0);
                this.state = 220;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 9) {
                    {
                    {
                    this.state = 216;
                    this.match(RustLikeParser.T__8);
                    this.state = 217;
                    this.expr(0);
                    }
                    }
                    this.state = 222;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 225;
            this.match(RustLikeParser.T__20);
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
        this.enterRule(localContext, 42, RustLikeParser.RULE_tuple_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 227;
            this.match(RustLikeParser.T__5);
            this.state = 236;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 6)) & ~0x1F) === 0 && ((1 << (_la - 6)) & 331379841) !== 0)) {
                {
                this.state = 228;
                this.expr(0);
                this.state = 233;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 9) {
                    {
                    {
                    this.state = 229;
                    this.match(RustLikeParser.T__8);
                    this.state = 230;
                    this.expr(0);
                    }
                    }
                    this.state = 235;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 238;
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
        this.enterRule(localContext, 44, RustLikeParser.RULE_range_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 240;
            this.u32_expr();
            this.state = 241;
            this.match(RustLikeParser.T__21);
            this.state = 242;
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
        this.enterRule(localContext, 46, RustLikeParser.RULE_u32_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 244;
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
        this.enterRule(localContext, 48, RustLikeParser.RULE_str_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 246;
            this.match(RustLikeParser.STRING);
            this.state = 249;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
            case 1:
                {
                this.state = 247;
                this.match(RustLikeParser.T__22);
                this.state = 248;
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
        this.enterRule(localContext, 50, RustLikeParser.RULE_bool_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 251;
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
        this.enterRule(localContext, 52, RustLikeParser.RULE_type);
        try {
            this.state = 266;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustLikeParser.T__23:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 253;
                this.match(RustLikeParser.T__23);
                }
                break;
            case RustLikeParser.T__24:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 254;
                this.match(RustLikeParser.T__24);
                }
                break;
            case RustLikeParser.T__25:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 255;
                this.match(RustLikeParser.T__25);
                }
                break;
            case RustLikeParser.T__26:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 256;
                this.match(RustLikeParser.T__26);
                }
                break;
            case RustLikeParser.T__17:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 257;
                this.match(RustLikeParser.T__17);
                this.state = 258;
                this.type_();
                }
                break;
            case RustLikeParser.T__4:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 259;
                this.match(RustLikeParser.T__4);
                this.state = 260;
                this.match(RustLikeParser.T__5);
                this.state = 261;
                this.type_list_opt();
                this.state = 262;
                this.match(RustLikeParser.T__6);
                this.state = 263;
                this.match(RustLikeParser.T__7);
                this.state = 264;
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
        this.enterRule(localContext, 54, RustLikeParser.RULE_type_list_opt);
        let _la: number;
        try {
            this.state = 277;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustLikeParser.T__6:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case RustLikeParser.T__4:
            case RustLikeParser.T__17:
            case RustLikeParser.T__23:
            case RustLikeParser.T__24:
            case RustLikeParser.T__25:
            case RustLikeParser.T__26:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 269;
                this.type_();
                this.state = 274;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 9) {
                    {
                    {
                    this.state = 270;
                    this.match(RustLikeParser.T__8);
                    this.state = 271;
                    this.type_();
                    }
                    }
                    this.state = 276;
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
        case 16:
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
        4,1,36,280,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,1,0,1,0,1,0,1,0,1,0,1,0,3,0,63,8,0,1,1,4,1,66,8,1,11,1,
        12,1,67,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,79,8,2,1,3,1,3,1,
        3,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,98,8,4,
        1,5,1,5,3,5,102,8,5,1,6,1,6,1,6,5,6,107,8,6,10,6,12,6,110,9,6,1,
        7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,10,1,10,1,
        10,1,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,3,12,136,8,12,1,13,
        1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,1,15,1,16,
        1,16,1,16,1,16,1,16,1,16,1,16,1,16,3,16,159,8,16,1,16,1,16,1,16,
        1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,
        5,16,177,8,16,10,16,12,16,180,9,16,1,17,1,17,1,17,1,17,1,17,1,17,
        1,17,1,17,1,17,1,17,1,17,1,17,1,17,3,17,195,8,17,1,18,1,18,1,18,
        1,18,5,18,201,8,18,10,18,12,18,204,9,18,3,18,206,8,18,1,19,1,19,
        1,19,1,19,1,19,3,19,213,8,19,1,20,1,20,1,20,1,20,5,20,219,8,20,10,
        20,12,20,222,9,20,3,20,224,8,20,1,20,1,20,1,21,1,21,1,21,1,21,5,
        21,232,8,21,10,21,12,21,235,9,21,3,21,237,8,21,1,21,1,21,1,22,1,
        22,1,22,1,22,1,23,1,23,1,24,1,24,1,24,3,24,250,8,24,1,25,1,25,1,
        26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,3,26,267,
        8,26,1,27,1,27,1,27,1,27,5,27,273,8,27,10,27,12,27,276,9,27,3,27,
        278,8,27,1,27,0,1,32,28,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,
        30,32,34,36,38,40,42,44,46,48,50,52,54,0,0,296,0,62,1,0,0,0,2,65,
        1,0,0,0,4,78,1,0,0,0,6,80,1,0,0,0,8,88,1,0,0,0,10,101,1,0,0,0,12,
        103,1,0,0,0,14,111,1,0,0,0,16,115,1,0,0,0,18,121,1,0,0,0,20,124,
        1,0,0,0,22,127,1,0,0,0,24,130,1,0,0,0,26,137,1,0,0,0,28,141,1,0,
        0,0,30,145,1,0,0,0,32,158,1,0,0,0,34,194,1,0,0,0,36,205,1,0,0,0,
        38,207,1,0,0,0,40,214,1,0,0,0,42,227,1,0,0,0,44,240,1,0,0,0,46,244,
        1,0,0,0,48,246,1,0,0,0,50,251,1,0,0,0,52,266,1,0,0,0,54,277,1,0,
        0,0,56,57,3,30,15,0,57,58,5,0,0,1,58,63,1,0,0,0,59,60,3,28,14,0,
        60,61,5,0,0,1,61,63,1,0,0,0,62,56,1,0,0,0,62,59,1,0,0,0,63,1,1,
        0,0,0,64,66,3,4,2,0,65,64,1,0,0,0,66,67,1,0,0,0,67,65,1,0,0,0,67,
        68,1,0,0,0,68,3,1,0,0,0,69,79,3,6,3,0,70,79,3,8,4,0,71,79,3,16,8,
        0,72,79,3,24,12,0,73,79,3,26,13,0,74,79,3,18,9,0,75,79,3,20,10,0,
        76,79,3,22,11,0,77,79,3,28,14,0,78,69,1,0,0,0,78,70,1,0,0,0,78,71,
        1,0,0,0,78,72,1,0,0,0,78,73,1,0,0,0,78,74,1,0,0,0,78,75,1,0,0,0,
        78,76,1,0,0,0,78,77,1,0,0,0,79,5,1,0,0,0,80,81,5,1,0,0,81,82,5,30,
        0,0,82,83,5,2,0,0,83,84,3,52,26,0,84,85,5,3,0,0,85,86,3,32,16,0,
        86,87,5,4,0,0,87,7,1,0,0,0,88,89,5,5,0,0,89,90,5,30,0,0,90,91,5,
        6,0,0,91,92,3,10,5,0,92,93,5,7,0,0,93,94,5,8,0,0,94,97,3,52,26,0,
        95,98,3,28,14,0,96,98,3,30,15,0,97,95,1,0,0,0,97,96,1,0,0,0,98,9,
        1,0,0,0,99,102,1,0,0,0,100,102,3,12,6,0,101,99,1,0,0,0,101,100,1,
        0,0,0,102,11,1,0,0,0,103,108,3,14,7,0,104,105,5,9,0,0,105,107,3,
        14,7,0,106,104,1,0,0,0,107,110,1,0,0,0,108,106,1,0,0,0,108,109,1,
        0,0,0,109,13,1,0,0,0,110,108,1,0,0,0,111,112,5,30,0,0,112,113,5,
        2,0,0,113,114,3,52,26,0,114,15,1,0,0,0,115,116,5,10,0,0,116,117,
        5,6,0,0,117,118,3,32,16,0,118,119,5,7,0,0,119,120,5,4,0,0,120,17,
        1,0,0,0,121,122,5,11,0,0,122,123,5,4,0,0,123,19,1,0,0,0,124,125,
        5,12,0,0,125,126,5,4,0,0,126,21,1,0,0,0,127,128,3,32,16,0,128,129,
        5,4,0,0,129,23,1,0,0,0,130,131,5,13,0,0,131,132,3,32,16,0,132,135,
        3,28,14,0,133,134,5,14,0,0,134,136,3,28,14,0,135,133,1,0,0,0,135,
        136,1,0,0,0,136,25,1,0,0,0,137,138,5,15,0,0,138,139,3,32,16,0,139,
        140,3,28,14,0,140,27,1,0,0,0,141,142,5,16,0,0,142,143,3,2,1,0,143,
        144,5,17,0,0,144,29,1,0,0,0,145,146,5,16,0,0,146,147,3,2,1,0,147,
        148,3,32,16,0,148,149,5,17,0,0,149,31,1,0,0,0,150,151,6,16,-1,0,
        151,152,5,34,0,0,152,159,3,32,16,8,153,154,5,18,0,0,154,159,3,32,
        16,7,155,156,5,19,0,0,156,159,3,32,16,6,157,159,3,34,17,0,158,150,
        1,0,0,0,158,153,1,0,0,0,158,155,1,0,0,0,158,157,1,0,0,0,159,178,
        1,0,0,0,160,161,10,3,0,0,161,162,5,32,0,0,162,177,3,32,16,4,163,
        164,10,2,0,0,164,165,5,33,0,0,165,177,3,32,16,3,166,167,10,5,0,0,
        167,168,5,20,0,0,168,169,3,32,16,0,169,170,5,21,0,0,170,177,1,0,
        0,0,171,172,10,4,0,0,172,173,5,6,0,0,173,174,3,36,18,0,174,175,5,
        7,0,0,175,177,1,0,0,0,176,160,1,0,0,0,176,163,1,0,0,0,176,166,1,
        0,0,0,176,171,1,0,0,0,177,180,1,0,0,0,178,176,1,0,0,0,178,179,1,
        0,0,0,179,33,1,0,0,0,180,178,1,0,0,0,181,195,3,46,23,0,182,195,3,
        48,24,0,183,195,3,50,25,0,184,195,5,30,0,0,185,186,5,6,0,0,186,187,
        3,32,16,0,187,188,5,7,0,0,188,195,1,0,0,0,189,195,3,38,19,0,190,
        195,3,40,20,0,191,195,3,42,21,0,192,195,3,44,22,0,193,195,3,30,15,
        0,194,181,1,0,0,0,194,182,1,0,0,0,194,183,1,0,0,0,194,184,1,0,0,
        0,194,185,1,0,0,0,194,189,1,0,0,0,194,190,1,0,0,0,194,191,1,0,0,
        0,194,192,1,0,0,0,194,193,1,0,0,0,195,35,1,0,0,0,196,206,1,0,0,0,
        197,202,3,32,16,0,198,199,5,9,0,0,199,201,3,32,16,0,200,198,1,0,
        0,0,201,204,1,0,0,0,202,200,1,0,0,0,202,203,1,0,0,0,203,206,1,0,
        0,0,204,202,1,0,0,0,205,196,1,0,0,0,205,197,1,0,0,0,206,37,1,0,0,
        0,207,208,5,13,0,0,208,209,3,32,16,0,209,212,3,30,15,0,210,211,5,
        14,0,0,211,213,3,30,15,0,212,210,1,0,0,0,212,213,1,0,0,0,213,39,
        1,0,0,0,214,223,5,20,0,0,215,220,3,32,16,0,216,217,5,9,0,0,217,219,
        3,32,16,0,218,216,1,0,0,0,219,222,1,0,0,0,220,218,1,0,0,0,220,221,
        1,0,0,0,221,224,1,0,0,0,222,220,1,0,0,0,223,215,1,0,0,0,223,224,
        1,0,0,0,224,225,1,0,0,0,225,226,5,21,0,0,226,41,1,0,0,0,227,236,
        5,6,0,0,228,233,3,32,16,0,229,230,5,9,0,0,230,232,3,32,16,0,231,
        229,1,0,0,0,232,235,1,0,0,0,233,231,1,0,0,0,233,234,1,0,0,0,234,
        237,1,0,0,0,235,233,1,0,0,0,236,228,1,0,0,0,236,237,1,0,0,0,237,
        238,1,0,0,0,238,239,5,7,0,0,239,43,1,0,0,0,240,241,3,46,23,0,241,
        242,5,22,0,0,242,243,3,46,23,0,243,45,1,0,0,0,244,245,5,28,0,0,245,
        47,1,0,0,0,246,249,5,29,0,0,247,248,5,23,0,0,248,250,5,29,0,0,249,
        247,1,0,0,0,249,250,1,0,0,0,250,49,1,0,0,0,251,252,5,31,0,0,252,
        51,1,0,0,0,253,267,5,24,0,0,254,267,5,25,0,0,255,267,5,26,0,0,256,
        267,5,27,0,0,257,258,5,18,0,0,258,267,3,52,26,0,259,260,5,5,0,0,
        260,261,5,6,0,0,261,262,3,54,27,0,262,263,5,7,0,0,263,264,5,8,0,
        0,264,265,3,52,26,0,265,267,1,0,0,0,266,253,1,0,0,0,266,254,1,0,
        0,0,266,255,1,0,0,0,266,256,1,0,0,0,266,257,1,0,0,0,266,259,1,0,
        0,0,267,53,1,0,0,0,268,278,1,0,0,0,269,274,3,52,26,0,270,271,5,9,
        0,0,271,273,3,52,26,0,272,270,1,0,0,0,273,276,1,0,0,0,274,272,1,
        0,0,0,274,275,1,0,0,0,275,278,1,0,0,0,276,274,1,0,0,0,277,268,1,
        0,0,0,277,269,1,0,0,0,278,55,1,0,0,0,22,62,67,78,97,101,108,135,
        158,176,178,194,202,205,212,220,223,233,236,249,266,274,277
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
    public block_expr(): Block_exprContext | null {
        return this.getRuleContext(0, Block_exprContext);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(RustLikeParser.EOF, 0)!;
    }
    public block_stmt(): Block_stmtContext | null {
        return this.getRuleContext(0, Block_stmtContext);
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
    public block_stmt(): Block_stmtContext | null {
        return this.getRuleContext(0, Block_stmtContext);
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
    public block_stmt(): Block_stmtContext | null {
        return this.getRuleContext(0, Block_stmtContext);
    }
    public block_expr(): Block_exprContext | null {
        return this.getRuleContext(0, Block_exprContext);
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
    public block_stmt(): Block_stmtContext[];
    public block_stmt(i: number): Block_stmtContext | null;
    public block_stmt(i?: number): Block_stmtContext[] | Block_stmtContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Block_stmtContext);
        }

        return this.getRuleContext(i, Block_stmtContext);
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
    public block_stmt(): Block_stmtContext {
        return this.getRuleContext(0, Block_stmtContext)!;
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


export class Block_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public stmt_list(): Stmt_listContext {
        return this.getRuleContext(0, Stmt_listContext)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_block_stmt;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterBlock_stmt) {
             listener.enterBlock_stmt(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitBlock_stmt) {
             listener.exitBlock_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitBlock_stmt) {
            return visitor.visitBlock_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Block_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public stmt_list(): Stmt_listContext {
        return this.getRuleContext(0, Stmt_listContext)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_block_expr;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterBlock_expr) {
             listener.enterBlock_expr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitBlock_expr) {
             listener.exitBlock_expr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitBlock_expr) {
            return visitor.visitBlock_expr(this);
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
export class RefExprContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterRefExpr) {
             listener.enterRefExpr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitRefExpr) {
             listener.exitRefExpr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitRefExpr) {
            return visitor.visitRefExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DerefExprContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterDerefExpr) {
             listener.enterDerefExpr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitDerefExpr) {
             listener.exitDerefExpr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitDerefExpr) {
            return visitor.visitDerefExpr(this);
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
    public block_expr(): Block_exprContext | null {
        return this.getRuleContext(0, Block_exprContext);
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
    public block_expr(): Block_exprContext[];
    public block_expr(i: number): Block_exprContext | null;
    public block_expr(i?: number): Block_exprContext[] | Block_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Block_exprContext);
        }

        return this.getRuleContext(i, Block_exprContext);
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
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public type_list_opt(): Type_list_optContext | null {
        return this.getRuleContext(0, Type_list_optContext);
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
