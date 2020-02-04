var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


router.get('/',passport.authenticate('isAdmin',{session:false}),(req, res) => {
  //console.log('Token Admin: ' + req.session.token)
  res.render('admin')
})

////////////// Utilizadores //////////////

router.get('/utilizadores/listar',passport.authenticate('isAdmin',{session:false}),async (req, res) => {
  await axios.get('http://localhost:4000/api/utilizador/listar',{ headers: {"Authorization" : req.session.token}})
          .then(dados => {res.render('admin',{utilizadores: dados.data}) })
          .catch(erro => {
              console.log('Erro na listagem do Utilizador: ' + erro)
              res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
  })
})

router.get('/utilizadores/listar/tipo',passport.authenticate('isAdmin',{session:false}),async (req, res) => {
  if(req.query.tipo != "None") {
    await axios.get(`http://localhost:4000/api/utilizador/listar/tipo/${req.query.tipo}`,{ headers: {"Authorization" : req.session.token}})
            .then(dados => {
                res.render('admin',{utilizadores: dados.data})})
            .catch(erro => {
                    console.log('Erro na listagem de Utilizadores: ' + erro)
                    res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
            }) 
   } else {
      res.redirect('/admin/utilizadores/listar')
   }
})

router.get('/utilizadores/atualizar',passport.authenticate('isAdmin',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/utilizador/atualizar/${req.query.email}`,{ headers: {"Authorization" : req.session.token}})
        .then(dados => {
            res.render('atualizaUtilizador',{utilizador: dados.data})})
        .catch(erro => {
                console.log('Erro ao gerar página de atualizar: ' + erro)
                res.render('error', {error: erro, message: "Erro ao gerar página de atualizar Utilizador"})
        })
})

router.post('/utilizadores/atualizar',passport.authenticate('isAdmin',{session:false}),async (req, res) => {
  await axios.post('http://localhost:4000/api/utilizador/atualizar', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:4000/admin/utilizadores/listar'))
        .catch(erro => {
            console.log('Erro na atualização do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na atualização do Utilizador"})
  })
})

router.post('/utilizadores/remover',passport.authenticate('isAdmin',{session:false}),async (req, res) => {
  await axios.post('http://localhost:4000/api/utilizador/remover', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:4000/admin/utilizadores/listar'))
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro na remoção de Utilizador"})
  })
})

router.post('/utilizadores/atualizar/estado/:email',passport.authenticate('isAdmin',{session:false}),async (req, res) => {
  const data = {
    email:req.params.email
  }
  await axios.post('http://localhost:4000/api/utilizador/atualizar/estado', data,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:4000/admin/utilizadores/listar'))
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro na atualizacao de estado do Utilizador"})
  })
})


////////////// Eventos //////////////

router.get('/eventos/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
  axios.get('http://localhost:4000/api/evento/listar',{ headers: {"Authorization" : req.session.token}})
      .then(dados => {
        res.render('admin',{eventos: dados.data})})
      .catch(erro => {
          console.log('Erro na listagem de eventos: ' + erro)
          res.render('error', {error: erro, message: "Erro na listagem de eventos"})
  })
})

router.get('/eventos/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
  res.render('registoEventoAdmin')
})

router.post('/evento',upload.array('ficheiro'),passport.authenticate('isAdmin',{session:false}),async (req, res) => {
  const data = {
    data: req.body,
    files: req.files,
  }
  await axios.post('http://localhost:4000/api/evento/registo', data,{ headers: {"Authorization" : req.session.token}})
        .then(dados => {
            res.redirect('/admin')
        })
        .catch(erro => {
            res.render('registoEventoAdmin', {message: erro.response.data.message})
            console.log(erro.message)
        })
})

router.get('/eventos/listar/tipo',passport.authenticate('isAdmin',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/listar/tipo/${req.query.tipo}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('admin',{eventos: dados.data})})
          .catch(erro => {
                  console.log('Erro na listagem de eventos: ' + erro)
                  res.render('error', {error: erro, message: "Erro na listagem de eventos"})
          })
})

router.get('/eventos/listar/utilizador',passport.authenticate('isAdmin',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/listar/utilizador/${req.query.email}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('admin',{eventos: dados.data})})
          .catch(erro => {
                  console.log('Erro na listagem de eventos: ' + erro)
                  res.render('error', {error: erro, message: "Erro na listagem de eventos"})
          })
})

router.get('/eventos/:id',passport.authenticate('isAdmin',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/${req.params.id}`,{ headers: {"Authorization" : req.session.token}})
        .then(dados => {
            res.render('atualizaEvento',{evento: dados.data})})
        .catch(erro => {
                console.log('Erro ao gerar página de atualizar: ' + erro)
                res.render('error', {error: erro, message: "Erro ao gerar página de atualizar evento"})
        })
})

router.post('/evento/atualizar',passport.authenticate('isAdmin',{session:false}),async (req, res) => {
  await axios.post('http://localhost:4000/api/evento/atualizar', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:4000/admin/evento/listar'))
        .catch(erro => {
            console.log('Erro na atualização do evento: ' + erro)
            res.render('error', {error: erro, message: "Erro na atualização do evento"})
  })
})

router.post('/evento/remover',passport.authenticate('isAdmin',{session:false}),async (req, res) => {
  await axios.post('http://localhost:4000/api/evento/remover', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:4000/admin/evento/listar'))
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro na remoção de evento"})
  })
})


////////////// Publicações //////////////

router.get('/publicacoes/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
  axios.get('http://localhost:4000/api/publicacao/listar',{ headers: {"Authorization" : req.session.token}})
      .then(dados => {
        res.render('admin',{publicacoes: dados.data})})
      .catch(erro => {
          console.log('Erro na listagem do publicacoes: ' + erro)
          res.render('error', {error: erro, message: "Erro na listagem do publicacoes"})
  })
})

module.exports = router;
