var express = require('express');
var router = express.Router();

var Pubs = require('../controllers/pubs')

router.get('/pubs', function(req, res) {
  if(req.query.autor){
    Pubs.listarPorAutor(req.query.autor)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
  }
  else if(req.query.type && req.query.year){
    Pubs.listarPorTipoAno(req.query.type, req.query.year)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
  }
  else if(req.query.type && !req.query.year){
    Pubs.listarPorTipo(req.query.type)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
  }
  else{
    Pubs.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
  }
})

router.get('/pubs/:id', function(req, res) {
  Pubs.listaUma(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

router.get('/types', function(req, res) {
  Pubs.tipos()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

router.get('/autores', function(req, res) {
  Pubs.autores()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;
