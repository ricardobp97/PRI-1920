var http = require('http')
var fs = require('fs')

var myserver = http.createServer(function(req,res) {
    var r = req.url.split('/')
    var num = r[r.length-1]
    var music = r[r.length-2]

    console.log(req.method + ' ' + req.url)
    if(req.method == 'GET'){
        if((music == 'musica') && (parseInt(num,10) > 0) && (parseInt(num,10) < 449)){
            fs.readFile('data/doc' + num + '.xml', (erro, dados)=>{
                if(!erro){
                    res.writeHead(200, {'Content-Type':'text/xml'}) 
                    res.write(dados);
                }
                else {
                    res.writeHead(200, {'Content-Type':'text/plain'}) 
                    res.write('Erro na leitura do ficheiro ' + 'data/doc' + num + '.xml...')
                }
                res.end()  
            });      
        }
        else if(num=="doc2html.xsl"){
            fs.readFile('doc2html.xsl', (erro, dados)=>{
                if(!erro){
                    res.writeHead(200, {'Content-Type':'text/xml'}) 
                    res.write(dados);
                }
                else {
                    res.writeHead(200, {'Content-Type':'text/plain'}) 
                    res.write('Erro na leitura do doc2html.xsl...')
                }
                res.end()  
            });
        }
        else if(req.url == '/'){
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'}) 
            res.end('Introduza um URL válido, por exemplo: "localhost:3023/musica/NUM" em que 0 < NUM < 449');
        }
        else{
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'}) 
            res.end('Introduza um URL válido, por exemplo: "localhost:3023/musica/NUM" em que 0 < NUM < 449');
        }
    } else {
        res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'}) 
        res.end('Introduza um URL válido, por exemplo: "localhost:3023/musica/NUM" em que 0 < NUM < 449');
    } 
})

myserver.listen(3023); 

console.log("Servidor ativo na porta 3023...");