// Generated from RegisterParser.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by RegisterParser.
function RegisterParserListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

RegisterParserListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
RegisterParserListener.prototype.constructor = RegisterParserListener;

// Enter a parse tree produced by RegisterParser#registo.
RegisterParserListener.prototype.enterRegisto = function(ctx) {
};

// Exit a parse tree produced by RegisterParser#registo.
RegisterParserListener.prototype.exitRegisto = function(ctx) {
};


// Enter a parse tree produced by RegisterParser#cabecalho.
RegisterParserListener.prototype.enterCabecalho = function(ctx) {
};

// Exit a parse tree produced by RegisterParser#cabecalho.
RegisterParserListener.prototype.exitCabecalho = function(ctx) {
};


// Enter a parse tree produced by RegisterParser#info.
RegisterParserListener.prototype.enterInfo = function(ctx) {
};

// Exit a parse tree produced by RegisterParser#info.
RegisterParserListener.prototype.exitInfo = function(ctx) {
};



exports.RegisterParserListener = RegisterParserListener;