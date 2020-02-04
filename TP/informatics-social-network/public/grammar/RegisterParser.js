// Generated from RegisterParser.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var RegisterParserListener = require('./RegisterParserListener').RegisterParserListener;
var RegisterParserVisitor = require('./RegisterParserVisitor').RegisterParserVisitor;

var grammarFileName = "RegisterParser.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\t\u001f\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0002",
    "\u0002\u0005\u0002\u0004\u0006\u0002\u0002\u0002\u001b\u0002\b\u0003",
    "\u0002\u0002\u0002\u0004\u000b\u0003\u0002\u0002\u0002\u0006\u000f\u0003",
    "\u0002\u0002\u0002\b\t\u0005\u0004\u0003\u0002\t\n\u0005\u0006\u0004",
    "\u0002\n\u0003\u0003\u0002\u0002\u0002\u000b\f\u0007\u0003\u0002\u0002",
    "\f\r\u0007\u0004\u0002\u0002\r\u000e\u0007\u0003\u0002\u0002\u000e\u0005",
    "\u0003\u0002\u0002\u0002\u000f\u0010\u0007\b\u0002\u0002\u0010\u0011",
    "\u0007\u0005\u0002\u0002\u0011\u0012\u0007\b\u0002\u0002\u0012\u0013",
    "\u0007\u0006\u0002\u0002\u0013\u0014\u0007\b\u0002\u0002\u0014\u0015",
    "\u0007\u0005\u0002\u0002\u0015\u0016\u0007\b\u0002\u0002\u0016\u0017",
    "\u0007\u0005\u0002\u0002\u0017\u0018\u0007\b\u0002\u0002\u0018\u0019",
    "\u0007\u0007\u0002\u0002\u0019\u001a\u0007\b\u0002\u0002\u001a\u001b",
    "\u0007\u0005\u0002\u0002\u001b\u001c\u0007\b\u0002\u0002\u001c\u001d",
    "\u0007\u0005\u0002\u0002\u001d\u0007\u0003\u0002\u0002\u0002\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [  ];

var symbolicNames = [ null, "BLOCK", "TEXT", "NOME", "EMAIL", "PASSWORD", 
                      "ENUNCIADO", "WS" ];

var ruleNames =  [ "registo", "cabecalho", "info" ];

function RegisterParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

RegisterParser.prototype = Object.create(antlr4.Parser.prototype);
RegisterParser.prototype.constructor = RegisterParser;

Object.defineProperty(RegisterParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

RegisterParser.EOF = antlr4.Token.EOF;
RegisterParser.BLOCK = 1;
RegisterParser.TEXT = 2;
RegisterParser.NOME = 3;
RegisterParser.EMAIL = 4;
RegisterParser.PASSWORD = 5;
RegisterParser.ENUNCIADO = 6;
RegisterParser.WS = 7;

RegisterParser.RULE_registo = 0;
RegisterParser.RULE_cabecalho = 1;
RegisterParser.RULE_info = 2;

function RegistoContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RegisterParser.RULE_registo;
    return this;
}

RegistoContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RegistoContext.prototype.constructor = RegistoContext;

RegistoContext.prototype.cabecalho = function() {
    return this.getTypedRuleContext(CabecalhoContext,0);
};

RegistoContext.prototype.info = function() {
    return this.getTypedRuleContext(InfoContext,0);
};

RegistoContext.prototype.enterRule = function(listener) {
    if(listener instanceof RegisterParserListener ) {
        listener.enterRegisto(this);
	}
};

RegistoContext.prototype.exitRule = function(listener) {
    if(listener instanceof RegisterParserListener ) {
        listener.exitRegisto(this);
	}
};

RegistoContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RegisterParserVisitor ) {
        return visitor.visitRegisto(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RegisterParser.RegistoContext = RegistoContext;

RegisterParser.prototype.registo = function() {

    var localctx = new RegistoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, RegisterParser.RULE_registo);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 6;
        this.cabecalho();
        this.state = 7;
        this.info();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function CabecalhoContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RegisterParser.RULE_cabecalho;
    return this;
}

CabecalhoContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CabecalhoContext.prototype.constructor = CabecalhoContext;

CabecalhoContext.prototype.BLOCK = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RegisterParser.BLOCK);
    } else {
        return this.getToken(RegisterParser.BLOCK, i);
    }
};


CabecalhoContext.prototype.TEXT = function() {
    return this.getToken(RegisterParser.TEXT, 0);
};

CabecalhoContext.prototype.enterRule = function(listener) {
    if(listener instanceof RegisterParserListener ) {
        listener.enterCabecalho(this);
	}
};

CabecalhoContext.prototype.exitRule = function(listener) {
    if(listener instanceof RegisterParserListener ) {
        listener.exitCabecalho(this);
	}
};

CabecalhoContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RegisterParserVisitor ) {
        return visitor.visitCabecalho(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RegisterParser.CabecalhoContext = CabecalhoContext;

RegisterParser.prototype.cabecalho = function() {

    var localctx = new CabecalhoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, RegisterParser.RULE_cabecalho);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 9;
        this.match(RegisterParser.BLOCK);
        this.state = 10;
        this.match(RegisterParser.TEXT);
        this.state = 11;
        this.match(RegisterParser.BLOCK);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function InfoContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RegisterParser.RULE_info;
    return this;
}

InfoContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InfoContext.prototype.constructor = InfoContext;

InfoContext.prototype.ENUNCIADO = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RegisterParser.ENUNCIADO);
    } else {
        return this.getToken(RegisterParser.ENUNCIADO, i);
    }
};


InfoContext.prototype.NOME = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RegisterParser.NOME);
    } else {
        return this.getToken(RegisterParser.NOME, i);
    }
};


InfoContext.prototype.EMAIL = function() {
    return this.getToken(RegisterParser.EMAIL, 0);
};

InfoContext.prototype.PASSWORD = function() {
    return this.getToken(RegisterParser.PASSWORD, 0);
};

InfoContext.prototype.enterRule = function(listener) {
    if(listener instanceof RegisterParserListener ) {
        listener.enterInfo(this);
	}
};

InfoContext.prototype.exitRule = function(listener) {
    if(listener instanceof RegisterParserListener ) {
        listener.exitInfo(this);
	}
};

InfoContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RegisterParserVisitor ) {
        return visitor.visitInfo(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RegisterParser.InfoContext = InfoContext;

RegisterParser.prototype.info = function() {

    var localctx = new InfoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, RegisterParser.RULE_info);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 13;
        this.match(RegisterParser.ENUNCIADO);
        this.state = 14;
        this.match(RegisterParser.NOME);
        this.state = 15;
        this.match(RegisterParser.ENUNCIADO);
        this.state = 16;
        this.match(RegisterParser.EMAIL);
        this.state = 17;
        this.match(RegisterParser.ENUNCIADO);
        this.state = 18;
        this.match(RegisterParser.NOME);
        this.state = 19;
        this.match(RegisterParser.ENUNCIADO);
        this.state = 20;
        this.match(RegisterParser.NOME);
        this.state = 21;
        this.match(RegisterParser.ENUNCIADO);
        this.state = 22;
        this.match(RegisterParser.PASSWORD);
        this.state = 23;
        this.match(RegisterParser.ENUNCIADO);
        this.state = 24;
        this.match(RegisterParser.NOME);
        this.state = 25;
        this.match(RegisterParser.ENUNCIADO);
        this.state = 26;
        this.match(RegisterParser.NOME);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.RegisterParser = RegisterParser;
