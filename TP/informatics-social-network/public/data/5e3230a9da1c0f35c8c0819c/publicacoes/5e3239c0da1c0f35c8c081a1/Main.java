import org.antlr.v4.runtime.*;

import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        listasMistasLexer lexer;
        try {
            lexer = new listasMistasLexer(CharStreams.fromFileName("/Users/rafaelsilva/Desktop/Universidade/4ºAno/PLC/GCS/Aula1/test/1.txt"));
            CommonTokenStream tokens = new CommonTokenStream(lexer);
            listasMistasParser parser = new listasMistasParser(tokens);
            ParserRuleContext ctx = parser.list();
            System.out.println("END");

        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

}