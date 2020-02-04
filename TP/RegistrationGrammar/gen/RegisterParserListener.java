// Generated from C:/Users/Bosch/Desktop/RegistrationGrammar/src\RegisterParser.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link RegisterParser}.
 */
public interface RegisterParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link RegisterParser#registo}.
	 * @param ctx the parse tree
	 */
	void enterRegisto(RegisterParser.RegistoContext ctx);
	/**
	 * Exit a parse tree produced by {@link RegisterParser#registo}.
	 * @param ctx the parse tree
	 */
	void exitRegisto(RegisterParser.RegistoContext ctx);
	/**
	 * Enter a parse tree produced by {@link RegisterParser#cabecalho}.
	 * @param ctx the parse tree
	 */
	void enterCabecalho(RegisterParser.CabecalhoContext ctx);
	/**
	 * Exit a parse tree produced by {@link RegisterParser#cabecalho}.
	 * @param ctx the parse tree
	 */
	void exitCabecalho(RegisterParser.CabecalhoContext ctx);
	/**
	 * Enter a parse tree produced by {@link RegisterParser#info}.
	 * @param ctx the parse tree
	 */
	void enterInfo(RegisterParser.InfoContext ctx);
	/**
	 * Exit a parse tree produced by {@link RegisterParser#info}.
	 * @param ctx the parse tree
	 */
	void exitInfo(RegisterParser.InfoContext ctx);
}