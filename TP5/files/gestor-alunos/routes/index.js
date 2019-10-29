var express = require('express')
var router = express.Router()
var jsonfile = require('jsonfile')
var nanoid = require('nanoid')

var myDB = "data/alunos.json"

/* GET home page. */
router.get('/alunos', function(req, res) {
  jsonfile.readFile(myDB, (erro,dados) => {
    if(!erro){
      res.render('index', {lista:dados})
    }
    else{
      res.render('error', {error: erro})
    }
  })
})

router.get('/alunos/:idAluno', function(req, res) {
  var id = req.params.idAluno
  jsonfile.readFile(myDB, (erro,dados) => {
    if(!erro){
      var element = dados.find(c => c.identificador == id)
      if(element){
        res.render('notas-aluno', {aluno:element})
      }
      else{
        res.render('index', {lista:dados})
      }
    }
    else{
      res.render('error', {error: erro})
    }
  })
})

router.post('/alunos', function(req, res) {
  var aluno = req.body
  aluno = {...aluno, notas:[]}
  jsonfile.readFile(myDB, (erro,dados) => {
    if(!erro){
      dados.push(aluno)
      jsonfile.writeFile(myDB, dados, erro => {
        if(erro) console.log(erro)
        else console.log('Aluno registado com sucesso.')
      })
    }
    res.render('index', {lista: dados})
  })
})

router.post('/alunos/:idAluno/notas', function(req, res) {
  var id = req.params.idAluno
  var nota = req.body
  jsonfile.readFile(myDB, (erro,dados) => {
    if(!erro){
      var aluno = dados.find(c => c.identificador == id)
      aluno['notas'].push(nota)
      jsonfile.writeFile(myDB, dados, erro => {
        if(erro) console.log(erro)
        else console.log('Indicador registado com sucesso.')
      })
    }
    res.render('notas-aluno', {aluno:aluno})
  })
})

router.delete('/alunos/:idAluno', function(req, res) {
  var id = req.params.idAluno
  jsonfile.readFile(myDB, (erro,dados) => {
    if(!erro){
      var index = dados.findIndex(c => c.identificador == id)
      if(index > -1){
        dados.splice(index,1)
        jsonfile.writeFile(myDB, dados, erro => {
          if(!erro) console.log(erro)
          else console.log('Aluno removido com sucesso.')
        })
      }
    }
    res.render('index', {lista: dados})
  })
})

router.delete('/alunos/:idAluno/notas/:indicador', function(req, res) {
  var id = req.params.idAluno
  var ind = req.params.indicador
  jsonfile.readFile(myDB, (erro,dados) => {
    if(!erro){
      var aluno = dados.find(c => c.identificador == id)
      var index = aluno["notas"].findIndex(c => c.indicador == ind)
      if(aluno && (index > -1)){
        aluno["notas"].splice(index,1)
        jsonfile.writeFile(myDB, dados, erro => {
          if(!erro) console.log(erro)
          else console.log('Aluno removido com sucesso.')
        })
      }
    }
    res.render('notas-aluno', {aluno:aluno})
  })
})

module.exports = router;
