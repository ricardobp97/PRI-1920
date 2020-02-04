// Generated from /Users/rafaelsilva/Desktop/work_space/PRI1920/informatics-social-network/public/grammar/RegisterLexer.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class RegisterLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		NOME=1, EMAIL=2, PASSWORD=3, ENUNCIADO=4, WS=5;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] ruleNames = {
		"NOME", "EMAIL", "PASSWORD", "ENUNCIADO", "WS"
	};

	private static final String[] _LITERAL_NAMES = {
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, "NOME", "EMAIL", "PASSWORD", "ENUNCIADO", "WS"
	};
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


	public RegisterLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "RegisterLexer.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\7>\b\1\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\3\2\6\2\17\n\2\r\2\16\2\20\3\2\3\2\6\2"+
		"\25\n\2\r\2\16\2\26\7\2\31\n\2\f\2\16\2\34\13\2\3\3\6\3\37\n\3\r\3\16"+
		"\3 \3\3\3\3\6\3%\n\3\r\3\16\3&\3\3\3\3\6\3+\n\3\r\3\16\3,\3\4\6\4\60\n"+
		"\4\r\4\16\4\61\3\5\6\5\65\n\5\r\5\16\5\66\3\5\3\5\3\6\3\6\3\6\3\6\2\2"+
		"\7\3\3\5\4\7\5\t\6\13\7\3\2\13\4\2C\\c|\7\2/\60\62;C\\aac|\3\2BB\3\2c"+
		"|\3\2\60\60\n\2##%%,,//\62;B\\aac|\7\2\"\")+..C\\c|\3\2<<\5\2\13\f\17"+
		"\17\"\"\2E\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2"+
		"\2\3\16\3\2\2\2\5\36\3\2\2\2\7/\3\2\2\2\t\64\3\2\2\2\13:\3\2\2\2\r\17"+
		"\t\2\2\2\16\r\3\2\2\2\17\20\3\2\2\2\20\16\3\2\2\2\20\21\3\2\2\2\21\32"+
		"\3\2\2\2\22\24\7\"\2\2\23\25\t\2\2\2\24\23\3\2\2\2\25\26\3\2\2\2\26\24"+
		"\3\2\2\2\26\27\3\2\2\2\27\31\3\2\2\2\30\22\3\2\2\2\31\34\3\2\2\2\32\30"+
		"\3\2\2\2\32\33\3\2\2\2\33\4\3\2\2\2\34\32\3\2\2\2\35\37\t\3\2\2\36\35"+
		"\3\2\2\2\37 \3\2\2\2 \36\3\2\2\2 !\3\2\2\2!\"\3\2\2\2\"$\t\4\2\2#%\t\5"+
		"\2\2$#\3\2\2\2%&\3\2\2\2&$\3\2\2\2&\'\3\2\2\2\'(\3\2\2\2(*\t\6\2\2)+\t"+
		"\5\2\2*)\3\2\2\2+,\3\2\2\2,*\3\2\2\2,-\3\2\2\2-\6\3\2\2\2.\60\t\7\2\2"+
		"/.\3\2\2\2\60\61\3\2\2\2\61/\3\2\2\2\61\62\3\2\2\2\62\b\3\2\2\2\63\65"+
		"\t\b\2\2\64\63\3\2\2\2\65\66\3\2\2\2\66\64\3\2\2\2\66\67\3\2\2\2\678\3"+
		"\2\2\289\t\t\2\29\n\3\2\2\2:;\t\n\2\2;<\3\2\2\2<=\b\6\2\2=\f\3\2\2\2\16"+
		"\2\20\26\32\36 &,/\61\64\66\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}