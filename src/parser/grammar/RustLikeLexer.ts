// Generated from grammar/RustLike.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";


export class RustLikeLexer extends antlr.Lexer {
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

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN"
    ];

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

    public static readonly modeNames = [
        "DEFAULT_MODE",
    ];

    public static readonly ruleNames = [
        "T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", 
        "T__8", "T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", 
        "T__16", "T__17", "T__18", "T__19", "INT", "STRING", "IDENTIFIER", 
        "BOOL", "BOOL_BINOP", "BOOL_OP", "INT_OP", "DIGIT", "LETTER", "WS", 
        "LINE_COMMENT",
    ];


    public constructor(input: antlr.CharStream) {
        super(input);
        this.interpreter = new antlr.LexerATNSimulator(this, RustLikeLexer._ATN, RustLikeLexer.decisionsToDFA, new antlr.PredictionContextCache());
    }

    public get grammarFileName(): string { return "RustLike.g4"; }

    public get literalNames(): (string | null)[] { return RustLikeLexer.literalNames; }
    public get symbolicNames(): (string | null)[] { return RustLikeLexer.symbolicNames; }
    public get ruleNames(): string[] { return RustLikeLexer.ruleNames; }

    public get serializedATN(): number[] { return RustLikeLexer._serializedATN; }

    public get channelNames(): string[] { return RustLikeLexer.channelNames; }

    public get modeNames(): string[] { return RustLikeLexer.modeNames; }

    public static readonly _serializedATN: number[] = [
        4,0,29,194,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,
        2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,
        13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,
        19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,
        26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,1,0,1,0,1,1,1,1,
        1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,4,1,5,1,5,1,6,1,6,1,7,1,7,1,7,
        1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,10,1,
        11,1,11,1,11,1,11,1,12,1,12,1,12,1,13,1,13,1,14,1,14,1,15,1,15,1,
        16,1,16,1,16,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,
        19,1,19,1,19,1,19,1,20,3,20,129,8,20,1,20,4,20,132,8,20,11,20,12,
        20,133,1,21,1,21,5,21,138,8,21,10,21,12,21,141,9,21,1,21,1,21,1,
        22,1,22,5,22,147,8,22,10,22,12,22,150,9,22,1,23,1,23,1,23,1,23,1,
        23,1,23,1,23,1,23,1,23,3,23,161,8,23,1,24,1,24,1,24,1,24,3,24,167,
        8,24,1,25,1,25,1,26,1,26,1,27,1,27,1,28,1,28,1,29,4,29,178,8,29,
        11,29,12,29,179,1,29,1,29,1,30,1,30,1,30,1,30,5,30,188,8,30,10,30,
        12,30,191,9,30,1,30,1,30,0,0,31,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,
        8,17,9,19,10,21,11,23,12,25,13,27,14,29,15,31,16,33,17,35,18,37,
        19,39,20,41,21,43,22,45,23,47,24,49,25,51,26,53,27,55,0,57,0,59,
        28,61,29,1,0,5,3,0,42,43,45,45,47,47,1,0,48,57,2,0,65,90,97,122,
        3,0,9,10,13,13,32,32,2,0,10,10,13,13,199,0,1,1,0,0,0,0,3,1,0,0,0,
        0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,
        15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,
        25,1,0,0,0,0,27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,0,
        35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,0,0,41,1,0,0,0,0,43,1,0,0,0,0,
        45,1,0,0,0,0,47,1,0,0,0,0,49,1,0,0,0,0,51,1,0,0,0,0,53,1,0,0,0,0,
        59,1,0,0,0,0,61,1,0,0,0,1,63,1,0,0,0,3,65,1,0,0,0,5,69,1,0,0,0,7,
        71,1,0,0,0,9,73,1,0,0,0,11,76,1,0,0,0,13,78,1,0,0,0,15,80,1,0,0,
        0,17,83,1,0,0,0,19,85,1,0,0,0,21,91,1,0,0,0,23,97,1,0,0,0,25,101,
        1,0,0,0,27,104,1,0,0,0,29,106,1,0,0,0,31,108,1,0,0,0,33,110,1,0,
        0,0,35,113,1,0,0,0,37,116,1,0,0,0,39,123,1,0,0,0,41,128,1,0,0,0,
        43,135,1,0,0,0,45,144,1,0,0,0,47,160,1,0,0,0,49,166,1,0,0,0,51,168,
        1,0,0,0,53,170,1,0,0,0,55,172,1,0,0,0,57,174,1,0,0,0,59,177,1,0,
        0,0,61,183,1,0,0,0,63,64,5,59,0,0,64,2,1,0,0,0,65,66,5,108,0,0,66,
        67,5,101,0,0,67,68,5,116,0,0,68,4,1,0,0,0,69,70,5,58,0,0,70,6,1,
        0,0,0,71,72,5,61,0,0,72,8,1,0,0,0,73,74,5,102,0,0,74,75,5,110,0,
        0,75,10,1,0,0,0,76,77,5,40,0,0,77,12,1,0,0,0,78,79,5,41,0,0,79,14,
        1,0,0,0,80,81,5,45,0,0,81,82,5,62,0,0,82,16,1,0,0,0,83,84,5,44,0,
        0,84,18,1,0,0,0,85,86,5,112,0,0,86,87,5,114,0,0,87,88,5,105,0,0,
        88,89,5,110,0,0,89,90,5,116,0,0,90,20,1,0,0,0,91,92,5,119,0,0,92,
        93,5,104,0,0,93,94,5,105,0,0,94,95,5,108,0,0,95,96,5,101,0,0,96,
        22,1,0,0,0,97,98,5,102,0,0,98,99,5,111,0,0,99,100,5,114,0,0,100,
        24,1,0,0,0,101,102,5,105,0,0,102,103,5,110,0,0,103,26,1,0,0,0,104,
        105,5,123,0,0,105,28,1,0,0,0,106,107,5,125,0,0,107,30,1,0,0,0,108,
        109,5,43,0,0,109,32,1,0,0,0,110,111,5,46,0,0,111,112,5,46,0,0,112,
        34,1,0,0,0,113,114,5,40,0,0,114,115,5,41,0,0,115,36,1,0,0,0,116,
        117,5,115,0,0,117,118,5,116,0,0,118,119,5,114,0,0,119,120,5,105,
        0,0,120,121,5,110,0,0,121,122,5,103,0,0,122,38,1,0,0,0,123,124,5,
        105,0,0,124,125,5,110,0,0,125,126,5,116,0,0,126,40,1,0,0,0,127,129,
        5,45,0,0,128,127,1,0,0,0,128,129,1,0,0,0,129,131,1,0,0,0,130,132,
        3,55,27,0,131,130,1,0,0,0,132,133,1,0,0,0,133,131,1,0,0,0,133,134,
        1,0,0,0,134,42,1,0,0,0,135,139,5,34,0,0,136,138,3,57,28,0,137,136,
        1,0,0,0,138,141,1,0,0,0,139,137,1,0,0,0,139,140,1,0,0,0,140,142,
        1,0,0,0,141,139,1,0,0,0,142,143,5,34,0,0,143,44,1,0,0,0,144,148,
        3,57,28,0,145,147,3,57,28,0,146,145,1,0,0,0,147,150,1,0,0,0,148,
        146,1,0,0,0,148,149,1,0,0,0,149,46,1,0,0,0,150,148,1,0,0,0,151,152,
        5,116,0,0,152,153,5,114,0,0,153,154,5,117,0,0,154,161,5,101,0,0,
        155,156,5,102,0,0,156,157,5,97,0,0,157,158,5,108,0,0,158,159,5,115,
        0,0,159,161,5,101,0,0,160,151,1,0,0,0,160,155,1,0,0,0,161,48,1,0,
        0,0,162,163,5,124,0,0,163,167,5,124,0,0,164,165,5,38,0,0,165,167,
        5,38,0,0,166,162,1,0,0,0,166,164,1,0,0,0,167,50,1,0,0,0,168,169,
        5,33,0,0,169,52,1,0,0,0,170,171,7,0,0,0,171,54,1,0,0,0,172,173,7,
        1,0,0,173,56,1,0,0,0,174,175,7,2,0,0,175,58,1,0,0,0,176,178,7,3,
        0,0,177,176,1,0,0,0,178,179,1,0,0,0,179,177,1,0,0,0,179,180,1,0,
        0,0,180,181,1,0,0,0,181,182,6,29,0,0,182,60,1,0,0,0,183,184,5,47,
        0,0,184,185,5,47,0,0,185,189,1,0,0,0,186,188,8,4,0,0,187,186,1,0,
        0,0,188,191,1,0,0,0,189,187,1,0,0,0,189,190,1,0,0,0,190,192,1,0,
        0,0,191,189,1,0,0,0,192,193,6,30,0,0,193,62,1,0,0,0,9,0,128,133,
        139,148,160,166,179,189,1,6,0,0
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!RustLikeLexer.__ATN) {
            RustLikeLexer.__ATN = new antlr.ATNDeserializer().deserialize(RustLikeLexer._serializedATN);
        }

        return RustLikeLexer.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(RustLikeLexer.literalNames, RustLikeLexer.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return RustLikeLexer.vocabulary;
    }

    private static readonly decisionsToDFA = RustLikeLexer._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}