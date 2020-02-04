parser grammar RegisterParser;

options {
    tokenVocab=RegisterLexer;
}
registo
    : cabecalho info
    ;
cabecalho
    : BLOCK TEXT BLOCK
    ;
info
    : ENUNCIADO NOME ENUNCIADO EMAIL ENUNCIADO NOME ENUNCIADO NOME ENUNCIADO PASSWORD ENUNCIADO NOME ENUNCIADO NOME
    ;