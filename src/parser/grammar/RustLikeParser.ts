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
    public static readonly INT = 21;
    public static readonly STRING = 22;
    public static readonly IDENTIFIER = 23;
    public static readonly BOOL = 24;
    public static readonly BOOL_BINOP = 25;
    public static readonly BOOL_OP = 26;
    public static readonly INT_OP = 27;
    public static readonly WS = 28;
    public static readonly LINE_COMMENT = 29;
    public static readonly RULE_prog = 0;
    public static readonly RULE_stmt_list = 1;
    public static readonly RULE_stmt = 2;
    public static readonly RULE_expr_stmt = 3;
    public static readonly RULE_decl = 4;
    public static readonly RULE_fn_decl = 5;
    public static readonly RULE_param_list_opt = 6;
    public static readonly RULE_param_list = 7;
    public static readonly RULE_param = 8;
    public static readonly RULE_print_stmt = 9;
    public static readonly RULE_bool_stmt = 10;
    public static readonly RULE_while_loop = 11;
    public static readonly RULE_for_loop = 12;
    public static readonly RULE_block = 13;
    public static readonly RULE_expression = 14;
    public static readonly RULE_int_expr = 15;
    public static readonly RULE_str_expr = 16;
    public static readonly RULE_bool_expr = 17;
    public static readonly RULE_tuple = 18;
    public static readonly RULE_expr_list = 19;
    public static readonly RULE_expr = 20;
    public static readonly RULE_type = 21;
    public static readonly RULE_type_list = 22;
    public static readonly RULE_tuple_type = 23;

    public static readonly literalNames = [
        null, "';'", "'let'", "':'", "'='", "'fn'", "'('", "')'", "'->'", 
        "','", "'print'", "'while'", "'for'", "'in'", "'{'", "'}'", "'+'", 
        "'..'", "'()'", "'string'", "'int'", null, null, null, null, null, 
        "'!'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, "INT", 
        "STRING", "IDENTIFIER", "BOOL", "BOOL_BINOP", "BOOL_OP", "INT_OP", 
        "WS", "LINE_COMMENT"
    ];
    public static readonly ruleNames = [
        "prog", "stmt_list", "stmt", "expr_stmt", "decl", "fn_decl", "param_list_opt", 
        "param_list", "param", "print_stmt", "bool_stmt", "while_loop", 
        "for_loop", "block", "expression", "int_expr", "str_expr", "bool_expr", 
        "tuple", "expr_list", "expr", "type", "type_list", "tuple_type",
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
            this.state = 48;
            this.stmt_list();
            this.state = 49;
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
            this.state = 52;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 51;
                this.stmt();
                }
                }
                this.state = 54;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 90178596) !== 0));
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
            this.state = 61;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 56;
                this.expr_stmt();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 57;
                this.decl();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 58;
                this.fn_decl();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 59;
                this.print_stmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 60;
                this.bool_stmt();
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
    public expr_stmt(): Expr_stmtContext {
        let localContext = new Expr_stmtContext(this.context, this.state);
        this.enterRule(localContext, 6, RustLikeParser.RULE_expr_stmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 63;
            this.expr();
            this.state = 64;
            this.match(RustLikeParser.T__0);
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
        this.enterRule(localContext, 8, RustLikeParser.RULE_decl);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 66;
            this.match(RustLikeParser.T__1);
            this.state = 67;
            this.match(RustLikeParser.IDENTIFIER);
            this.state = 68;
            this.match(RustLikeParser.T__2);
            this.state = 69;
            this.type_();
            this.state = 70;
            this.match(RustLikeParser.T__3);
            this.state = 71;
            this.expr();
            this.state = 72;
            this.match(RustLikeParser.T__0);
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
        this.enterRule(localContext, 10, RustLikeParser.RULE_fn_decl);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 74;
            this.match(RustLikeParser.T__4);
            this.state = 75;
            this.match(RustLikeParser.IDENTIFIER);
            this.state = 76;
            this.match(RustLikeParser.T__5);
            this.state = 77;
            this.param_list_opt();
            this.state = 78;
            this.match(RustLikeParser.T__6);
            this.state = 79;
            this.match(RustLikeParser.T__7);
            this.state = 80;
            this.type_();
            this.state = 81;
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
        this.enterRule(localContext, 12, RustLikeParser.RULE_param_list_opt);
        try {
            this.state = 85;
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
                this.state = 84;
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
        this.enterRule(localContext, 14, RustLikeParser.RULE_param_list);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 87;
            this.param();
            this.state = 92;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 9) {
                {
                {
                this.state = 88;
                this.match(RustLikeParser.T__8);
                this.state = 89;
                this.param();
                }
                }
                this.state = 94;
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
        this.enterRule(localContext, 16, RustLikeParser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 95;
            this.match(RustLikeParser.IDENTIFIER);
            this.state = 96;
            this.match(RustLikeParser.T__2);
            this.state = 97;
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
        this.enterRule(localContext, 18, RustLikeParser.RULE_print_stmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 99;
            this.match(RustLikeParser.T__9);
            this.state = 100;
            this.match(RustLikeParser.T__5);
            this.state = 101;
            this.expr();
            this.state = 102;
            this.match(RustLikeParser.T__6);
            this.state = 103;
            this.match(RustLikeParser.T__0);
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
    public bool_stmt(): Bool_stmtContext {
        let localContext = new Bool_stmtContext(this.context, this.state);
        this.enterRule(localContext, 20, RustLikeParser.RULE_bool_stmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 105;
            this.bool_expr();
            this.state = 106;
            this.match(RustLikeParser.T__0);
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
        this.enterRule(localContext, 22, RustLikeParser.RULE_while_loop);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 108;
            this.match(RustLikeParser.T__10);
            this.state = 109;
            this.bool_expr();
            this.state = 110;
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
    public for_loop(): For_loopContext {
        let localContext = new For_loopContext(this.context, this.state);
        this.enterRule(localContext, 24, RustLikeParser.RULE_for_loop);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 112;
            this.match(RustLikeParser.T__11);
            this.state = 113;
            this.match(RustLikeParser.IDENTIFIER);
            this.state = 114;
            this.match(RustLikeParser.T__12);
            this.state = 115;
            this.tuple();
            this.state = 116;
            this.match(RustLikeParser.T__2);
            this.state = 117;
            this.type_();
            this.state = 118;
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
        this.enterRule(localContext, 26, RustLikeParser.RULE_block);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 120;
            this.match(RustLikeParser.T__13);
            this.state = 121;
            this.stmt_list();
            this.state = 122;
            this.match(RustLikeParser.T__14);
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
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 28, RustLikeParser.RULE_expression);
        try {
            this.state = 127;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustLikeParser.INT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 124;
                this.int_expr();
                }
                break;
            case RustLikeParser.STRING:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 125;
                this.str_expr();
                }
                break;
            case RustLikeParser.BOOL:
            case RustLikeParser.BOOL_OP:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 126;
                this.bool_expr();
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
    public int_expr(): Int_exprContext {
        let localContext = new Int_exprContext(this.context, this.state);
        this.enterRule(localContext, 30, RustLikeParser.RULE_int_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 129;
            this.match(RustLikeParser.INT);
            this.state = 132;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 27) {
                {
                this.state = 130;
                this.match(RustLikeParser.INT_OP);
                this.state = 131;
                this.match(RustLikeParser.INT);
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
    public str_expr(): Str_exprContext {
        let localContext = new Str_exprContext(this.context, this.state);
        this.enterRule(localContext, 32, RustLikeParser.RULE_str_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 134;
            this.match(RustLikeParser.STRING);
            this.state = 137;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 16) {
                {
                this.state = 135;
                this.match(RustLikeParser.T__15);
                this.state = 136;
                this.match(RustLikeParser.STRING);
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
    public bool_expr(): Bool_exprContext {
        let localContext = new Bool_exprContext(this.context, this.state);
        this.enterRule(localContext, 34, RustLikeParser.RULE_bool_expr);
        let _la: number;
        try {
            this.state = 146;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustLikeParser.BOOL:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 139;
                this.match(RustLikeParser.BOOL);
                this.state = 142;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 25) {
                    {
                    this.state = 140;
                    this.match(RustLikeParser.BOOL_BINOP);
                    this.state = 141;
                    this.match(RustLikeParser.BOOL);
                    }
                }

                }
                break;
            case RustLikeParser.BOOL_OP:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 144;
                this.match(RustLikeParser.BOOL_OP);
                this.state = 145;
                this.bool_expr();
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
    public tuple(): TupleContext {
        let localContext = new TupleContext(this.context, this.state);
        this.enterRule(localContext, 36, RustLikeParser.RULE_tuple);
        try {
            this.state = 156;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustLikeParser.T__5:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 148;
                this.match(RustLikeParser.T__5);
                this.state = 149;
                this.expr_list();
                this.state = 150;
                this.match(RustLikeParser.T__6);
                }
                break;
            case RustLikeParser.INT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 152;
                this.int_expr();
                this.state = 153;
                this.match(RustLikeParser.T__16);
                this.state = 154;
                this.int_expr();
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
    public expr_list(): Expr_listContext {
        let localContext = new Expr_listContext(this.context, this.state);
        this.enterRule(localContext, 38, RustLikeParser.RULE_expr_list);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 158;
            this.expr();
            this.state = 163;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 9) {
                {
                {
                this.state = 159;
                this.match(RustLikeParser.T__8);
                this.state = 160;
                this.expr();
                }
                }
                this.state = 165;
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
    public expr(): ExprContext {
        let localContext = new ExprContext(this.context, this.state);
        this.enterRule(localContext, 40, RustLikeParser.RULE_expr);
        try {
            this.state = 169;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustLikeParser.INT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 166;
                this.int_expr();
                }
                break;
            case RustLikeParser.STRING:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 167;
                this.str_expr();
                }
                break;
            case RustLikeParser.BOOL:
            case RustLikeParser.BOOL_OP:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 168;
                this.bool_expr();
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
    public type_(): TypeContext {
        let localContext = new TypeContext(this.context, this.state);
        this.enterRule(localContext, 42, RustLikeParser.RULE_type);
        try {
            this.state = 182;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustLikeParser.T__17:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 171;
                this.match(RustLikeParser.T__17);
                }
                break;
            case RustLikeParser.T__18:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 172;
                this.match(RustLikeParser.T__18);
                }
                break;
            case RustLikeParser.T__19:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 173;
                this.match(RustLikeParser.T__19);
                }
                break;
            case RustLikeParser.T__5:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 174;
                this.tuple_type();
                }
                break;
            case RustLikeParser.T__4:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 175;
                this.match(RustLikeParser.T__4);
                this.state = 176;
                this.match(RustLikeParser.T__5);
                this.state = 177;
                this.type_list();
                this.state = 178;
                this.match(RustLikeParser.T__6);
                this.state = 179;
                this.match(RustLikeParser.T__7);
                this.state = 180;
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
    public type_list(): Type_listContext {
        let localContext = new Type_listContext(this.context, this.state);
        this.enterRule(localContext, 44, RustLikeParser.RULE_type_list);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 184;
            this.type_();
            this.state = 189;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 9) {
                {
                {
                this.state = 185;
                this.match(RustLikeParser.T__8);
                this.state = 186;
                this.type_();
                }
                }
                this.state = 191;
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
    public tuple_type(): Tuple_typeContext {
        let localContext = new Tuple_typeContext(this.context, this.state);
        this.enterRule(localContext, 46, RustLikeParser.RULE_tuple_type);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 192;
            this.match(RustLikeParser.T__5);
            this.state = 193;
            this.type_list();
            this.state = 194;
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

    public static readonly _serializedATN: number[] = [
        4,1,29,197,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,1,0,1,0,1,0,1,1,4,1,53,8,1,11,
        1,12,1,54,1,2,1,2,1,2,1,2,1,2,3,2,62,8,2,1,3,1,3,1,3,1,4,1,4,1,4,
        1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,6,1,6,
        3,6,86,8,6,1,7,1,7,1,7,5,7,91,8,7,10,7,12,7,94,9,7,1,8,1,8,1,8,1,
        8,1,9,1,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,12,
        1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,13,1,13,1,13,1,13,1,14,1,14,
        1,14,3,14,128,8,14,1,15,1,15,1,15,3,15,133,8,15,1,16,1,16,1,16,3,
        16,138,8,16,1,17,1,17,1,17,3,17,143,8,17,1,17,1,17,3,17,147,8,17,
        1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,157,8,18,1,19,1,19,
        1,19,5,19,162,8,19,10,19,12,19,165,9,19,1,20,1,20,1,20,3,20,170,
        8,20,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,
        183,8,21,1,22,1,22,1,22,5,22,188,8,22,10,22,12,22,191,9,22,1,23,
        1,23,1,23,1,23,1,23,0,0,24,0,2,4,6,8,10,12,14,16,18,20,22,24,26,
        28,30,32,34,36,38,40,42,44,46,0,0,194,0,48,1,0,0,0,2,52,1,0,0,0,
        4,61,1,0,0,0,6,63,1,0,0,0,8,66,1,0,0,0,10,74,1,0,0,0,12,85,1,0,0,
        0,14,87,1,0,0,0,16,95,1,0,0,0,18,99,1,0,0,0,20,105,1,0,0,0,22,108,
        1,0,0,0,24,112,1,0,0,0,26,120,1,0,0,0,28,127,1,0,0,0,30,129,1,0,
        0,0,32,134,1,0,0,0,34,146,1,0,0,0,36,156,1,0,0,0,38,158,1,0,0,0,
        40,169,1,0,0,0,42,182,1,0,0,0,44,184,1,0,0,0,46,192,1,0,0,0,48,49,
        3,2,1,0,49,50,5,0,0,1,50,1,1,0,0,0,51,53,3,4,2,0,52,51,1,0,0,0,53,
        54,1,0,0,0,54,52,1,0,0,0,54,55,1,0,0,0,55,3,1,0,0,0,56,62,3,6,3,
        0,57,62,3,8,4,0,58,62,3,10,5,0,59,62,3,18,9,0,60,62,3,20,10,0,61,
        56,1,0,0,0,61,57,1,0,0,0,61,58,1,0,0,0,61,59,1,0,0,0,61,60,1,0,0,
        0,62,5,1,0,0,0,63,64,3,40,20,0,64,65,5,1,0,0,65,7,1,0,0,0,66,67,
        5,2,0,0,67,68,5,23,0,0,68,69,5,3,0,0,69,70,3,42,21,0,70,71,5,4,0,
        0,71,72,3,40,20,0,72,73,5,1,0,0,73,9,1,0,0,0,74,75,5,5,0,0,75,76,
        5,23,0,0,76,77,5,6,0,0,77,78,3,12,6,0,78,79,5,7,0,0,79,80,5,8,0,
        0,80,81,3,42,21,0,81,82,3,26,13,0,82,11,1,0,0,0,83,86,1,0,0,0,84,
        86,3,14,7,0,85,83,1,0,0,0,85,84,1,0,0,0,86,13,1,0,0,0,87,92,3,16,
        8,0,88,89,5,9,0,0,89,91,3,16,8,0,90,88,1,0,0,0,91,94,1,0,0,0,92,
        90,1,0,0,0,92,93,1,0,0,0,93,15,1,0,0,0,94,92,1,0,0,0,95,96,5,23,
        0,0,96,97,5,3,0,0,97,98,3,42,21,0,98,17,1,0,0,0,99,100,5,10,0,0,
        100,101,5,6,0,0,101,102,3,40,20,0,102,103,5,7,0,0,103,104,5,1,0,
        0,104,19,1,0,0,0,105,106,3,34,17,0,106,107,5,1,0,0,107,21,1,0,0,
        0,108,109,5,11,0,0,109,110,3,34,17,0,110,111,3,26,13,0,111,23,1,
        0,0,0,112,113,5,12,0,0,113,114,5,23,0,0,114,115,5,13,0,0,115,116,
        3,36,18,0,116,117,5,3,0,0,117,118,3,42,21,0,118,119,3,26,13,0,119,
        25,1,0,0,0,120,121,5,14,0,0,121,122,3,2,1,0,122,123,5,15,0,0,123,
        27,1,0,0,0,124,128,3,30,15,0,125,128,3,32,16,0,126,128,3,34,17,0,
        127,124,1,0,0,0,127,125,1,0,0,0,127,126,1,0,0,0,128,29,1,0,0,0,129,
        132,5,21,0,0,130,131,5,27,0,0,131,133,5,21,0,0,132,130,1,0,0,0,132,
        133,1,0,0,0,133,31,1,0,0,0,134,137,5,22,0,0,135,136,5,16,0,0,136,
        138,5,22,0,0,137,135,1,0,0,0,137,138,1,0,0,0,138,33,1,0,0,0,139,
        142,5,24,0,0,140,141,5,25,0,0,141,143,5,24,0,0,142,140,1,0,0,0,142,
        143,1,0,0,0,143,147,1,0,0,0,144,145,5,26,0,0,145,147,3,34,17,0,146,
        139,1,0,0,0,146,144,1,0,0,0,147,35,1,0,0,0,148,149,5,6,0,0,149,150,
        3,38,19,0,150,151,5,7,0,0,151,157,1,0,0,0,152,153,3,30,15,0,153,
        154,5,17,0,0,154,155,3,30,15,0,155,157,1,0,0,0,156,148,1,0,0,0,156,
        152,1,0,0,0,157,37,1,0,0,0,158,163,3,40,20,0,159,160,5,9,0,0,160,
        162,3,40,20,0,161,159,1,0,0,0,162,165,1,0,0,0,163,161,1,0,0,0,163,
        164,1,0,0,0,164,39,1,0,0,0,165,163,1,0,0,0,166,170,3,30,15,0,167,
        170,3,32,16,0,168,170,3,34,17,0,169,166,1,0,0,0,169,167,1,0,0,0,
        169,168,1,0,0,0,170,41,1,0,0,0,171,183,5,18,0,0,172,183,5,19,0,0,
        173,183,5,20,0,0,174,183,3,46,23,0,175,176,5,5,0,0,176,177,5,6,0,
        0,177,178,3,44,22,0,178,179,5,7,0,0,179,180,5,8,0,0,180,181,3,42,
        21,0,181,183,1,0,0,0,182,171,1,0,0,0,182,172,1,0,0,0,182,173,1,0,
        0,0,182,174,1,0,0,0,182,175,1,0,0,0,183,43,1,0,0,0,184,189,3,42,
        21,0,185,186,5,9,0,0,186,188,3,42,21,0,187,185,1,0,0,0,188,191,1,
        0,0,0,189,187,1,0,0,0,189,190,1,0,0,0,190,45,1,0,0,0,191,189,1,0,
        0,0,192,193,5,6,0,0,193,194,3,44,22,0,194,195,5,7,0,0,195,47,1,0,
        0,0,14,54,61,85,92,127,132,137,142,146,156,163,169,182,189
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
    public expr_stmt(): Expr_stmtContext | null {
        return this.getRuleContext(0, Expr_stmtContext);
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
    public bool_stmt(): Bool_stmtContext | null {
        return this.getRuleContext(0, Bool_stmtContext);
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


export class Bool_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public bool_expr(): Bool_exprContext {
        return this.getRuleContext(0, Bool_exprContext)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_bool_stmt;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterBool_stmt) {
             listener.enterBool_stmt(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitBool_stmt) {
             listener.exitBool_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitBool_stmt) {
            return visitor.visitBool_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class While_loopContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public bool_expr(): Bool_exprContext {
        return this.getRuleContext(0, Bool_exprContext)!;
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


export class For_loopContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RustLikeParser.IDENTIFIER, 0)!;
    }
    public tuple(): TupleContext {
        return this.getRuleContext(0, TupleContext)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_for_loop;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterFor_loop) {
             listener.enterFor_loop(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitFor_loop) {
             listener.exitFor_loop(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitFor_loop) {
            return visitor.visitFor_loop(this);
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


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public int_expr(): Int_exprContext | null {
        return this.getRuleContext(0, Int_exprContext);
    }
    public str_expr(): Str_exprContext | null {
        return this.getRuleContext(0, Str_exprContext);
    }
    public bool_expr(): Bool_exprContext | null {
        return this.getRuleContext(0, Bool_exprContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_expression;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Int_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INT(): antlr.TerminalNode[];
    public INT(i: number): antlr.TerminalNode | null;
    public INT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RustLikeParser.INT);
    	} else {
    		return this.getToken(RustLikeParser.INT, i);
    	}
    }
    public INT_OP(): antlr.TerminalNode | null {
        return this.getToken(RustLikeParser.INT_OP, 0);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_int_expr;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterInt_expr) {
             listener.enterInt_expr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitInt_expr) {
             listener.exitInt_expr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitInt_expr) {
            return visitor.visitInt_expr(this);
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
    public BOOL(): antlr.TerminalNode[];
    public BOOL(i: number): antlr.TerminalNode | null;
    public BOOL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RustLikeParser.BOOL);
    	} else {
    		return this.getToken(RustLikeParser.BOOL, i);
    	}
    }
    public BOOL_BINOP(): antlr.TerminalNode | null {
        return this.getToken(RustLikeParser.BOOL_BINOP, 0);
    }
    public BOOL_OP(): antlr.TerminalNode | null {
        return this.getToken(RustLikeParser.BOOL_OP, 0);
    }
    public bool_expr(): Bool_exprContext | null {
        return this.getRuleContext(0, Bool_exprContext);
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


export class TupleContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr_list(): Expr_listContext | null {
        return this.getRuleContext(0, Expr_listContext);
    }
    public int_expr(): Int_exprContext[];
    public int_expr(i: number): Int_exprContext | null;
    public int_expr(i?: number): Int_exprContext[] | Int_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Int_exprContext);
        }

        return this.getRuleContext(i, Int_exprContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_tuple;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterTuple) {
             listener.enterTuple(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitTuple) {
             listener.exitTuple(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitTuple) {
            return visitor.visitTuple(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_listContext extends antlr.ParserRuleContext {
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
        return RustLikeParser.RULE_expr_list;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterExpr_list) {
             listener.enterExpr_list(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitExpr_list) {
             listener.exitExpr_list(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitExpr_list) {
            return visitor.visitExpr_list(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public int_expr(): Int_exprContext | null {
        return this.getRuleContext(0, Int_exprContext);
    }
    public str_expr(): Str_exprContext | null {
        return this.getRuleContext(0, Str_exprContext);
    }
    public bool_expr(): Bool_exprContext | null {
        return this.getRuleContext(0, Bool_exprContext);
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_expr;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterExpr) {
             listener.enterExpr(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitExpr) {
             listener.exitExpr(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitExpr) {
            return visitor.visitExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public tuple_type(): Tuple_typeContext | null {
        return this.getRuleContext(0, Tuple_typeContext);
    }
    public type_list(): Type_listContext | null {
        return this.getRuleContext(0, Type_listContext);
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


export class Type_listContext extends antlr.ParserRuleContext {
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
        return RustLikeParser.RULE_type_list;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterType_list) {
             listener.enterType_list(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitType_list) {
             listener.exitType_list(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitType_list) {
            return visitor.visitType_list(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Tuple_typeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public type_list(): Type_listContext {
        return this.getRuleContext(0, Type_listContext)!;
    }
    public override get ruleIndex(): number {
        return RustLikeParser.RULE_tuple_type;
    }
    public override enterRule(listener: RustLikeListener): void {
        if(listener.enterTuple_type) {
             listener.enterTuple_type(this);
        }
    }
    public override exitRule(listener: RustLikeListener): void {
        if(listener.exitTuple_type) {
             listener.exitTuple_type(this);
        }
    }
    public override accept<Result>(visitor: RustLikeVisitor<Result>): Result | null {
        if (visitor.visitTuple_type) {
            return visitor.visitTuple_type(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
