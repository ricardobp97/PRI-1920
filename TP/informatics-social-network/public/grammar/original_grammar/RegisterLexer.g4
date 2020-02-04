lexer grammar RegisterLexer;

BLOCK       :   [\-]+' '[a-zA-Z]+' '[\-]+                       ;
TEXT        :   [^\-]                                           ;
NOME        :   ([a-zA-Z]+)(' '[a-zA-Z]+)*                      ;
EMAIL       :   ([a-zA-Z]|[\-_.]|[0-9])+[@]([a-z]+)[.]([a-z]+)  ;
PASSWORD    :   ([a-zA-Z]|[\-_@#!*]|[0-9])+                     ;
ENUNCIADO   :   ([a-zA-Z]|' '|[(),'])+[:]                       ;
WS          :   [ \r\n\t] -> skip                               ;