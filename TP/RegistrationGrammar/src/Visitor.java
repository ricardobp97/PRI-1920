public class Visitor extends  RegisterParserBaseVisitor<Integer>{
    private String res;

    public Visitor() {
        this.res = "{ \"nome\": " ;
    }

    public String getJson() {
        return this.res;
    }

    @Override
    public Integer visitRegisto(RegisterParser.RegistoContext ctx){
        return visit(ctx.info());
    }

    @Override
    public Integer visitInfo(RegisterParser.InfoContext ctx) {
        this.res += "\"" + ctx.NOME(0) + "\", \"email\": ";
        this.res += "\"" + ctx.EMAIL() + "\", \"cidade\": ";
        this.res += "\"" + ctx.NOME(1) + "\", \"curso\": ";
        this.res += "\"" + ctx.NOME(2) + "\", \"password\": ";
        this.res += "\"" + ctx.PASSWORD() + "\", \"tipo\": ";
        this.res += "\"" + ctx.NOME(3) + "\", \"genero\": ";
        this.res += "\"" + ctx.NOME(4) + "\" }";

        return 1;
    }
}
