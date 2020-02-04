// Generated from C:/Users/Bosch/Desktop/RegistrationGrammar/src\RegisterParser.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class RegisterParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.7.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		BLOCK=1, TEXT=2, NOME=3, EMAIL=4, PASSWORD=5, ENUNCIADO=6, WS=7;
	public static final int
		RULE_registo = 0, RULE_cabecalho = 1, RULE_info = 2;
	private static String[] makeRuleNames() {
		return new String[] {
			"registo", "cabecalho", "info"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "BLOCK", "TEXT", "NOME", "EMAIL", "PASSWORD", "ENUNCIADO", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "RegisterParser.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public RegisterParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class RegistoContext extends ParserRuleContext {
		public CabecalhoContext cabecalho() {
			return getRuleContext(CabecalhoContext.class,0);
		}
		public InfoContext info() {
			return getRuleContext(InfoContext.class,0);
		}
		public RegistoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_registo; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof RegisterParserListener ) ((RegisterParserListener)listener).enterRegisto(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof RegisterParserListener ) ((RegisterParserListener)listener).exitRegisto(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof RegisterParserVisitor ) return ((RegisterParserVisitor<? extends T>)visitor).visitRegisto(this);
			else return visitor.visitChildren(this);
		}
	}

	public final RegistoContext registo() throws RecognitionException {
		RegistoContext _localctx = new RegistoContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_registo);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(6);
			cabecalho();
			setState(7);
			info();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CabecalhoContext extends ParserRuleContext {
		public List<TerminalNode> BLOCK() { return getTokens(RegisterParser.BLOCK); }
		public TerminalNode BLOCK(int i) {
			return getToken(RegisterParser.BLOCK, i);
		}
		public TerminalNode TEXT() { return getToken(RegisterParser.TEXT, 0); }
		public CabecalhoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_cabecalho; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof RegisterParserListener ) ((RegisterParserListener)listener).enterCabecalho(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof RegisterParserListener ) ((RegisterParserListener)listener).exitCabecalho(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof RegisterParserVisitor ) return ((RegisterParserVisitor<? extends T>)visitor).visitCabecalho(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CabecalhoContext cabecalho() throws RecognitionException {
		CabecalhoContext _localctx = new CabecalhoContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_cabecalho);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(9);
			match(BLOCK);
			setState(10);
			match(TEXT);
			setState(11);
			match(BLOCK);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class InfoContext extends ParserRuleContext {
		public List<TerminalNode> ENUNCIADO() { return getTokens(RegisterParser.ENUNCIADO); }
		public TerminalNode ENUNCIADO(int i) {
			return getToken(RegisterParser.ENUNCIADO, i);
		}
		public List<TerminalNode> NOME() { return getTokens(RegisterParser.NOME); }
		public TerminalNode NOME(int i) {
			return getToken(RegisterParser.NOME, i);
		}
		public TerminalNode EMAIL() { return getToken(RegisterParser.EMAIL, 0); }
		public TerminalNode PASSWORD() { return getToken(RegisterParser.PASSWORD, 0); }
		public InfoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_info; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof RegisterParserListener ) ((RegisterParserListener)listener).enterInfo(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof RegisterParserListener ) ((RegisterParserListener)listener).exitInfo(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof RegisterParserVisitor ) return ((RegisterParserVisitor<? extends T>)visitor).visitInfo(this);
			else return visitor.visitChildren(this);
		}
	}

	public final InfoContext info() throws RecognitionException {
		InfoContext _localctx = new InfoContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_info);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(13);
			match(ENUNCIADO);
			setState(14);
			match(NOME);
			setState(15);
			match(ENUNCIADO);
			setState(16);
			match(EMAIL);
			setState(17);
			match(ENUNCIADO);
			setState(18);
			match(NOME);
			setState(19);
			match(ENUNCIADO);
			setState(20);
			match(NOME);
			setState(21);
			match(ENUNCIADO);
			setState(22);
			match(PASSWORD);
			setState(23);
			match(ENUNCIADO);
			setState(24);
			match(NOME);
			setState(25);
			match(ENUNCIADO);
			setState(26);
			match(NOME);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\t\37\4\2\t\2\4\3"+
		"\t\3\4\4\t\4\3\2\3\2\3\2\3\3\3\3\3\3\3\3\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3"+
		"\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\2\2\5\2\4\6\2\2\2\33\2\b\3\2\2\2\4"+
		"\13\3\2\2\2\6\17\3\2\2\2\b\t\5\4\3\2\t\n\5\6\4\2\n\3\3\2\2\2\13\f\7\3"+
		"\2\2\f\r\7\4\2\2\r\16\7\3\2\2\16\5\3\2\2\2\17\20\7\b\2\2\20\21\7\5\2\2"+
		"\21\22\7\b\2\2\22\23\7\6\2\2\23\24\7\b\2\2\24\25\7\5\2\2\25\26\7\b\2\2"+
		"\26\27\7\5\2\2\27\30\7\b\2\2\30\31\7\7\2\2\31\32\7\b\2\2\32\33\7\5\2\2"+
		"\33\34\7\b\2\2\34\35\7\5\2\2\35\7\3\2\2\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}