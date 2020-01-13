var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/tipologias?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ')
    .then(dados => {
        res.render('index', {lista:dados.data})
    })
    .catch(erro => {
        res.render('error', {error: erro})
    })
});

router.get('/tip/:id', function(req, res, next) {
  let tipologia
  let elementos
  
  axios.get(`http://clav-api.dglab.gov.pt/api/tipologias/${req.params.id}?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ`)
    .then(dados => {
        axios.get(`http://clav-api.dglab.gov.pt/api/tipologias/${req.params.id}/elementos?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ`)
          .then(d => {
            axios.get(`http://clav-api.dglab.gov.pt/api/tipologias/${req.params.id}/intervencao/dono?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ`)
              .then(da => {
                axios.get(`http://clav-api.dglab.gov.pt/api/tipologias/${req.params.id}/intervencao/participante?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ`)
                  .then(dad => {
                    res.render('tipologia', {tip:dados.data, elem: d.data, dono: da.data, participa: dad.data})
                  })
                  .catch(erro => {
                      res.render('error', {error: erro})
                  })
              })
              .catch(erro => {
                  res.render('error', {error: erro})
              })
          })
          .catch(erro => {
              res.render('error', {error: erro})
          })
    })
    .catch(erro => {
        res.render('error', {error: erro})
    })
});

module.exports = router;