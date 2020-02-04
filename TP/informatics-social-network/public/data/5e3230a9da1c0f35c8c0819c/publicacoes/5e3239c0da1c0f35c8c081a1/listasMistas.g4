grammar listasMistas;

@members {
    int comp = 0 ;
    int soma = 0 ;
}

// Lexer
LPAREN : '[' ;
RPAREN : ']' ;
COMMA  : ',' ;
WORD   : [a-zA-Z]+ ;
NUM    : [0-9]+ ;
// NUM : ('0'..'9')+ ;
WS     : [ \t\n\r]+ -> skip ;

// Parser
list
    : LPAREN content RPAREN
    {
    System.out.println("Valor de comp: " + comp + " e soma: " + soma);
    }
    ;
content
    : item {comp = 1; } ( COMMA item {comp++;})*  // Versao ANTLR
    ;
/*
content
    : item
    | item COMMA content
    ;
*/
item
    : WORD {
            if ($WORD.text.equals("agora")) { System.out.println("Find Word -> agora"); }
            else { System.out.println("Not Find -> agora"); }
            }
    | NUM {
            soma += $NUM.int ;
          }
    ;