// Generated from RegisterLexer.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\tU\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0003\u0002\u0006\u0002\u0013\n\u0002\r\u0002\u000e\u0002",
    "\u0014\u0003\u0002\u0003\u0002\u0006\u0002\u0019\n\u0002\r\u0002\u000e",
    "\u0002\u001a\u0003\u0002\u0003\u0002\u0006\u0002\u001f\n\u0002\r\u0002",
    "\u000e\u0002 \u0003\u0003\u0003\u0003\u0003\u0004\u0006\u0004&\n\u0004",
    "\r\u0004\u000e\u0004\'\u0003\u0004\u0003\u0004\u0006\u0004,\n\u0004",
    "\r\u0004\u000e\u0004-\u0007\u00040\n\u0004\f\u0004\u000e\u00043\u000b",
    "\u0004\u0003\u0005\u0006\u00056\n\u0005\r\u0005\u000e\u00057\u0003\u0005",
    "\u0003\u0005\u0006\u0005<\n\u0005\r\u0005\u000e\u0005=\u0003\u0005\u0003",
    "\u0005\u0006\u0005B\n\u0005\r\u0005\u000e\u0005C\u0003\u0006\u0006\u0006",
    "G\n\u0006\r\u0006\u000e\u0006H\u0003\u0007\u0006\u0007L\n\u0007\r\u0007",
    "\u000e\u0007M\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0002\u0002\t\u0003\u0003\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007",
    "\r\b\u000f\t\u0003\u0002\r\u0003\u0002//\u0004\u0002C\\c|\u0004\u0002",
    "//``\u0007\u0002/02;C\\aac|\u0003\u0002BB\u0003\u0002c|\u0003\u0002",
    "00\n\u0002##%%,,//2;B\\aac|\u0007\u0002\"\")+..C\\c|\u0003\u0002<<\u0005",
    "\u0002\u000b\f\u000f\u000f\"\"\u0002_\u0002\u0003\u0003\u0002\u0002",
    "\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002\u0002",
    "\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b\u0003\u0002\u0002",
    "\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f\u0003\u0002\u0002",
    "\u0002\u0003\u0012\u0003\u0002\u0002\u0002\u0005\"\u0003\u0002\u0002",
    "\u0002\u0007%\u0003\u0002\u0002\u0002\t5\u0003\u0002\u0002\u0002\u000b",
    "F\u0003\u0002\u0002\u0002\rK\u0003\u0002\u0002\u0002\u000fQ\u0003\u0002",
    "\u0002\u0002\u0011\u0013\t\u0002\u0002\u0002\u0012\u0011\u0003\u0002",
    "\u0002\u0002\u0013\u0014\u0003\u0002\u0002\u0002\u0014\u0012\u0003\u0002",
    "\u0002\u0002\u0014\u0015\u0003\u0002\u0002\u0002\u0015\u0016\u0003\u0002",
    "\u0002\u0002\u0016\u0018\u0007\"\u0002\u0002\u0017\u0019\t\u0003\u0002",
    "\u0002\u0018\u0017\u0003\u0002\u0002\u0002\u0019\u001a\u0003\u0002\u0002",
    "\u0002\u001a\u0018\u0003\u0002\u0002\u0002\u001a\u001b\u0003\u0002\u0002",
    "\u0002\u001b\u001c\u0003\u0002\u0002\u0002\u001c\u001e\u0007\"\u0002",
    "\u0002\u001d\u001f\t\u0002\u0002\u0002\u001e\u001d\u0003\u0002\u0002",
    "\u0002\u001f \u0003\u0002\u0002\u0002 \u001e\u0003\u0002\u0002\u0002",
    " !\u0003\u0002\u0002\u0002!\u0004\u0003\u0002\u0002\u0002\"#\t\u0004",
    "\u0002\u0002#\u0006\u0003\u0002\u0002\u0002$&\t\u0003\u0002\u0002%$",
    "\u0003\u0002\u0002\u0002&\'\u0003\u0002\u0002\u0002\'%\u0003\u0002\u0002",
    "\u0002\'(\u0003\u0002\u0002\u0002(1\u0003\u0002\u0002\u0002)+\u0007",
    "\"\u0002\u0002*,\t\u0003\u0002\u0002+*\u0003\u0002\u0002\u0002,-\u0003",
    "\u0002\u0002\u0002-+\u0003\u0002\u0002\u0002-.\u0003\u0002\u0002\u0002",
    ".0\u0003\u0002\u0002\u0002/)\u0003\u0002\u0002\u000203\u0003\u0002\u0002",
    "\u00021/\u0003\u0002\u0002\u000212\u0003\u0002\u0002\u00022\b\u0003",
    "\u0002\u0002\u000231\u0003\u0002\u0002\u000246\t\u0005\u0002\u00025",
    "4\u0003\u0002\u0002\u000267\u0003\u0002\u0002\u000275\u0003\u0002\u0002",
    "\u000278\u0003\u0002\u0002\u000289\u0003\u0002\u0002\u00029;\t\u0006",
    "\u0002\u0002:<\t\u0007\u0002\u0002;:\u0003\u0002\u0002\u0002<=\u0003",
    "\u0002\u0002\u0002=;\u0003\u0002\u0002\u0002=>\u0003\u0002\u0002\u0002",
    ">?\u0003\u0002\u0002\u0002?A\t\b\u0002\u0002@B\t\u0007\u0002\u0002A",
    "@\u0003\u0002\u0002\u0002BC\u0003\u0002\u0002\u0002CA\u0003\u0002\u0002",
    "\u0002CD\u0003\u0002\u0002\u0002D\n\u0003\u0002\u0002\u0002EG\t\t\u0002",
    "\u0002FE\u0003\u0002\u0002\u0002GH\u0003\u0002\u0002\u0002HF\u0003\u0002",
    "\u0002\u0002HI\u0003\u0002\u0002\u0002I\f\u0003\u0002\u0002\u0002JL",
    "\t\n\u0002\u0002KJ\u0003\u0002\u0002\u0002LM\u0003\u0002\u0002\u0002",
    "MK\u0003\u0002\u0002\u0002MN\u0003\u0002\u0002\u0002NO\u0003\u0002\u0002",
    "\u0002OP\t\u000b\u0002\u0002P\u000e\u0003\u0002\u0002\u0002QR\t\f\u0002",
    "\u0002RS\u0003\u0002\u0002\u0002ST\b\b\u0002\u0002T\u0010\u0003\u0002",
    "\u0002\u0002\u0011\u0002\u0014\u001a \'-157=CFHKM\u0003\b\u0002\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function RegisterLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

RegisterLexer.prototype = Object.create(antlr4.Lexer.prototype);
RegisterLexer.prototype.constructor = RegisterLexer;

Object.defineProperty(RegisterLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

RegisterLexer.EOF = antlr4.Token.EOF;
RegisterLexer.BLOCK = 1;
RegisterLexer.TEXT = 2;
RegisterLexer.NOME = 3;
RegisterLexer.EMAIL = 4;
RegisterLexer.PASSWORD = 5;
RegisterLexer.ENUNCIADO = 6;
RegisterLexer.WS = 7;

RegisterLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

RegisterLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

RegisterLexer.prototype.literalNames = [  ];

RegisterLexer.prototype.symbolicNames = [ null, "BLOCK", "TEXT", "NOME", 
                                          "EMAIL", "PASSWORD", "ENUNCIADO", 
                                          "WS" ];

RegisterLexer.prototype.ruleNames = [ "BLOCK", "TEXT", "NOME", "EMAIL", 
                                      "PASSWORD", "ENUNCIADO", "WS" ];

RegisterLexer.prototype.grammarFileName = "RegisterLexer.g4";



exports.RegisterLexer = RegisterLexer;

