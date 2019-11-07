var express = require('express')
var router = express.Router()
const axios = require('axios')

//GET: Lista de Actores
router.get('/', function(req, res) {
    axios.get('http://localhost:3011/api/actores')
        .then(dados => {
            res.render('lista-actores', {lista:dados.data})
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

module.exports = router