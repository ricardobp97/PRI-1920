var express = require('express');
var router = express.Router();

var Obras = require('../controllers/obras')

// Lista de Obras com possiveis filtros
router.get('/obras', function(req, res) {
    if(req.query.periodo){
        Obras.listarPorPeriodo(req.query.periodo)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
    else if(req.query.anoCriacao){
        Obras.listarPorAno(req.query.anoCriacao)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
    else if(req.query.compositor){
        Obras.listarPorCompositor(req.query.compositor)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
    else {
        Obras.listar()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
})

// Lista de compositores
router.get('/compositores', function(req, res) {
    Obras.listarCompositores()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

router.get('/compositores/:nome', function(req, res) {
    Obras.listarPorCompositor(req.params.nome)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;
