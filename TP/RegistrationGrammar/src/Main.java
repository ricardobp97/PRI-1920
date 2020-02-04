import java.io.IOException;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.ParserRuleContext;
import org.antlr.v4.runtime.TokenSource;

public class Main {
    public static void main(String[] args) throws IOException {
        RegisterLexer lexer = new RegisterLexer(CharStreams.fromFileName("./test.txt"));
        CommonTokenStream tokens = new CommonTokenStream((TokenSource) lexer);
        RegisterParser parser = new RegisterParser(tokens);
        ParserRuleContext ctx = parser.registo();

        Visitor visitor = new Visitor();
        visitor.visit(ctx);
        System.out.println(visitor.getJson());
    }
}
