var express = require('express')
var router = express.Router()
const axios = require('axios')

var Filmes = require('../controllers/filmes')
var Actores = require('../controllers/actores')

// GET: Lista de Filmes
router.get('/filmes', function(req, res) {
    Filmes.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

// GET: Lista de Actores
router.get('/actores', function(req, res) {
    Actores.listarActores()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

// GET: Mostrar filmes do ano pedido
router.get('/filmes/ano/:ano', function(req, res) {
    var ano = req.params.ano
    Filmes.listarAno(ano)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

// GET: mostrar numero de filmes do actor
router.get('/filmes/actor/:actor', function(req, res) {
    var actor = req.params.actor
    Filmes.numFilmesActor(actor)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

// GET: Mostrar filmes por actor
router.get('/filmes/ator/:actor', function(req, res) {
    var actor = req.params.actor
    Filmes.listarPorActor(actor)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

// GET: mostrar numero de filmes do actor
router.get('/filmes/genero/:genero', function(req, res) {
    var genero = req.params.genero
    Filmes.numFilmesGenero(genero)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

// GET: Mostrar filmes por genero
router.get('/filmes/gen/:genero', function(req, res) {
    var genero = req.params.genero
    Filmes.listarPorGenero(genero)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

// GET: Informação do Filme
router.get('/filmes/:idFilme', function(req, res) {
    Filmes.consultar(req.params.idFilme)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

// POST: Inserir um Filme
router.post('/filmes', function(req, res) {
    Filmes.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

// POST: Inserir um Actor em Filme
router.post('/filmes/actor/:idFilme', function(req, res) {
    var id = req.params.idFilme
    var actor = req.body.cast
    Filmes.insereActor(id,actor)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

// POST: Inserir um Genero em Filme
router.post('/filmes/genero/:idFilme', function(req, res) {
    var id = req.params.idFilme
    var genero = req.body.genres
    Filmes.insereGenero(id,genero)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

// DELETE: Remover um Actor de um Filme
router.delete('/filmes/actor/:idFilme', function(req, res) {
    var id = req.params.idFilme
    var actor = req.body.cast
    Filmes.removerActor(id,actor)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

// DELETE: Remover um Genero de um Filme
router.delete('/filmes/genero/:idFilme', function(req, res) {
    var id = req.params.idFilme
    var genero = req.body.genres
    Filmes.removerGenero(id,genero)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

// DELETE: Remover um Filme
router.delete('/filmes/:idFilme', function(req, res) {
    Filmes.remover(req.params.idFilme)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router