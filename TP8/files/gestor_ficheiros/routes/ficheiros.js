var express = require('express');
var router = express.Router();
var axios = require('axios')
const lhost = require('../config/env').host

/* GET Listar ficheiros */
router.get('/', function(req, res) {
  axios.get(lhost + '/api/ficheiros')
    .then(dados => {
      res.render('index', {lista: dados.data})
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
});

module.exports = router;
