// Generated from C:/Users/Bosch/Desktop/RegistrationGrammar/src\RegisterParser.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.tree.ParseTreeVisitor;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link RegisterParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
public interface RegisterParserVisitor<T> extends ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link RegisterParser#registo}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRegisto(RegisterParser.RegistoContext ctx);
	/**
	 * Visit a parse tree produced by {@link RegisterParser#cabecalho}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCabecalho(RegisterParser.CabecalhoContext ctx);
	/**
	 * Visit a parse tree produced by {@link RegisterParser#info}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitInfo(RegisterParser.InfoContext ctx);
}