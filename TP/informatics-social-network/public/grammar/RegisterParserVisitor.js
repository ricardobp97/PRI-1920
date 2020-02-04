// Generated from RegisterParser.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by RegisterParser.

function RegisterParserVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	this.res = "{ \"nome\": " ;
	this.getUser = function() {
		return this.res;
	}
	return this;
}

RegisterParserVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
RegisterParserVisitor.prototype.constructor = RegisterParserVisitor;

// Visit a parse tree produced by RegisterParser#registo.
RegisterParserVisitor.prototype.visitRegisto = function(ctx) {
  return this.visitInfo(ctx.info());
};


// Visit a parse tree produced by RegisterParser#cabecalho.
RegisterParserVisitor.prototype.visitCabecalho = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RegisterParser#info.
RegisterParserVisitor.prototype.visitInfo = function(ctx) {
  this.res += "\"" + ctx.NOME(0) + "\", \"email\": ";
  this.res += "\"" + ctx.EMAIL() + "\", \"local\": ";
  this.res += "\"" + ctx.NOME(1) + "\", \"curso\": ";
  this.res += "\"" + ctx.NOME(2) + "\", \"password\": ";
  this.res += "\"" + ctx.PASSWORD() + "\", \"tipoUtilizador\": ";
  this.res += "\"" + ctx.NOME(3) + "\", \"genero\": ";
  this.res += "\"" + ctx.NOME(4) + "\" }";

  return 1;
};



exports.RegisterParserVisitor = RegisterParserVisitor;