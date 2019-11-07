var express = require('express')
var router = express.Router()
const axios = require('axios')

//GET: Lista de Filmes
router.get('/', function(req, res) {
    axios.get('http://localhost:3011/api/filmes')
        .then(dados => {
            res.render('lista-filmes', {lista:dados.data})
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

//GET: Formúlario para inserir filme
router.get('/inserir', function(req, res) {
    res.render('form-filme')
})

//GET: Página do actor
router.get('/actor/:idFilme/:actor', function(req, res) {
    var id = req.params.idFilme
    var actor = req.params.actor
    axios.get(`http://localhost:3011/api/filmes/actor/${actor}`)
        .then(dados => {
            res.render('info-actor', {num: dados.data, name: actor, filme: id})
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

//GET: Página do genero
router.get('/genero/:idFilme/:genero', function(req, res) {
    var id = req.params.idFilme
    var genero = req.params.genero
    axios.get(`http://localhost:3011/api/filmes/genero/${genero}`)
        .then(dados => {
            res.render('info-actor', {num: dados.data, name: genero, filme: id})
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

//GET: Página do filme
router.get('/:idFilme', function(req, res) {
    var id = req.params.idFilme
    axios.get(`http://localhost:3011/api/filmes/${id}`)
        .then(dados => {
            res.render('info-filme', {filme:dados.data})
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

//POST: Inserir filme
router.post("/", function(req, res) {
    axios.post('http://localhost:3011/api/filmes', req.body)
        .then(dados => {
            res.redirect('/')
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

//POST: Mostrar filmes por ano
router.post('/ano', function(req, res) {
    var ano = req.body.year
    axios.get(`http://localhost:3011/api/filmes/ano/${ano}`)
        .then(dados => {
            res.render('lista-filmes', {lista:dados.data})
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

//POST: Inserir actor em filme
router.post("/actor/:idFilme", function(req, res) {
    var id = req.params.idFilme
    var actor = req.body
    axios.post(`http://localhost:3011/api/filmes/actor/${id}`, actor)
        .then(dados => {
            res.redirect(`/filmes/${id}`)
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

//POST: Mostrar filmes por actor
router.post('/actor', function(req, res) {
    var actor = req.body.actor
    axios.get(`http://localhost:3011/api/filmes/ator/${actor}`)
        .then(dados => {
            res.render('lista-filmes', {lista:dados.data})
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

//POST: Mostrar filmes por genero
router.post('/genero', function(req, res) {
    var genero = req.body.genero
    axios.get(`http://localhost:3011/api/filmes/gen/${genero}`)
        .then(dados => {
            res.render('lista-filmes', {lista:dados.data})
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

//POST: Inserir genero em filme
router.post("/genero/:idFilme", function(req, res) {
    var id = req.params.idFilme
    var actor = req.body
    axios.post(`http://localhost:3011/api/filmes/genero/${id}`, actor)
        .then(dados => {
            res.redirect(`/filmes/${id}`)
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

//DELETE: Remover Actor de Filme
router.delete("/actor/:idFilme", function(req, res) {
    var id = req.params.idFilme
    var actor = req.body.cast
    axios.delete(`http://localhost:3011/api/filmes/actor/${id}`, {data: {"cast": actor}})
        .then(dados => {
            var filme = dados.find(c => c._id == id)
            res.render('info-filme', {filme:filme})
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

//DELETE: Remover Genero de Filme
router.delete("/genero/:idFilme", function(req, res) {
    var id = req.params.idFilme
    var genero = req.body.genres
    axios.delete(`http://localhost:3011/api/filmes/genero/${id}`, {data: {"genres": genero}})
        .then(dados => {
            var filme = dados.find(c => c._id == id)
            res.render('info-filme', {filme:filme})
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

//DELETE: Remover Filme
router.delete("/:idFilme", function(req, res) {
    var id = req.params.idFilme
    axios.delete(`http://localhost:3011/api/filmes/${id}`)
        .then(dados => {
            res.render('lista-filmes', {lista:dados.data})
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

module.exports = router;