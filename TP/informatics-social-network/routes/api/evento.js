var express = require('express');
var router = express.Router();
var passport = require('passport')
var jwt = require('jsonwebtoken')
const fs = require('fs')
var rimraf = require("rimraf");

const Eventos = require('../../controllers/evento')


///////////////////////////////////////////////////////////////////////////
////////////////////////////////// Admin //////////////////////////////////
///////////////////////////////////////////////////////////////////////////

router.get('/listar', passport.authenticate('isAdmin',{session:false}),(req, res) => {
  Eventos.listar()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

// Rota da api para listar os eventos por tipo
router.get('/listar/tipo/:tipo',passport.authenticate('isAdmin',{session:false}),(req,res) => {
  Eventos.listarTipo(req.params.tipo)
      .then(dados => { res.jsonp(dados)})
      .catch(erro => res.status(500).send('Erro na listagem dos evento: ' + erro))
})

// Rota da api para listar os utilizadores por tipo
router.get('/listar/utilizador/:email',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
  Eventos.consultarPerUser(req.params.email)
      .then(dados => { res.jsonp(dados)})
      .catch(erro => res.status(500).send('Erro na listagem dos evento: ' + erro))
})

// Rota da api para consutar um utilizador na base de dados
router.get('/individual/:id',passport.authenticate('isAdmin',{session:false}),(req,res)=>{
  Eventos.consultar(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na obtenção do evento: ' + erro))
})

// Rota da api para atualizar um utilizador na base de dados
router.post('/atualizarAdmin',passport.authenticate('isAdmin',{session:false}),(req,res)=>{
  Eventos.atualiza(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na atualização do evento: ' + erro))
})

// Rota da api para remover um utilizador da base de dados
router.post('/removerAdmin',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
  Eventos.remove(req.body.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na remoção do Utilizador: ' + erro))
})


///////////////////////////////////////////////////////////////////////////
////////////////////////////////// Aluno ////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////

router.get('/listarAluno', passport.authenticate('isAluno',{session:false}),(req, res) => {
  Eventos.listarAlunos()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/aluno/listar/titulo/:titulo', passport.authenticate('isAluno',{session:false}),(req, res) => {
  Eventos.listarTituloAluno(req.params.titulo)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/aluno/listar/uc/:uc', passport.authenticate('isAluno',{session:false}),(req, res) => {
  Eventos.listarUCAluno(req.params.uc)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/aluno/listar/visivilidade/:visivilidade', passport.authenticate('isAluno',{session:false}),async (req, res) => {
  if(req.params.visivilidade != -1) {
    await Eventos.listarVisivilidadeAluno(req.params.visivilidade)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  } else {
    await Eventos.listarAlunos()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  }
});

router.get('/aluno/listar/tipo/:tipo', passport.authenticate('isAluno',{session:false}),async (req, res) => {
  if(req.params.tipo != "Tipo") {
    await Eventos.listarTipoAluno(req.params.tipo)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  } else {
    await Eventos.listarAlunos()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  }
});

router.get('/aluno/listar/data/:data', passport.authenticate('isAluno',{session:false}),(req, res) => {
  Eventos.listarDataAluno(req.params.data)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});


////////////////////////////////////////////////////////////////////
//////////////////////////// Docente ///////////////////////////////
////////////////////////////////////////////////////////////////////

router.get('/listarDocente', passport.authenticate('isDocente',{session:false}),(req, res) => {
  Eventos.listarDocentes()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/docente/listar/titulo/:titulo', passport.authenticate('isDocente',{session:false}),(req, res) => {
  Eventos.listarTituloDocente(req.params.titulo)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/docente/listar/uc/:uc', passport.authenticate('isDocente',{session:false}),(req, res) => {
  Eventos.listarUCDocente(req.params.uc)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/docente/listar/visivilidade/:visivilidade', passport.authenticate('isDocente',{session:false}),async (req, res) => {
  if(req.params.visivilidade != -1) {
    await Eventos.listarVisivilidadeDocente(req.params.visivilidade)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  } else {
    await Eventos.listarDocentes()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  }
});

router.get('/docente/listar/tipo/:tipo', passport.authenticate('isDocente',{session:false}),async (req, res) => {
  if(req.params.tipo != "Tipo") {
    await Eventos.listarTipoDocente(req.params.tipo)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  } else {
    await Eventos.listarDocentes()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  }
});

router.get('/docente/listar/data/:data', passport.authenticate('isDocente',{session:false}),(req, res) => {
  Eventos.listarDataDocente(req.params.data)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});


//////////////////////////////////////////////////////////////////// 
///////////////////////////  Geral /////////////////////////////////
////////////////////////////////////////////////////////////////////

router.post('/remover', passport.authenticate(['isAluno','isDocente'],{session:false}),async (req, res) => {
  try {
    var evento = null
    var decoded = jwt.verify(req.headers.authorization, 'pri1920');
    await Eventos.consultar(req.body.id_evento)
          .then(dados => evento = dados)
          .catch(erro => res.status(500).jsonp(erro))
    if(evento!= null) {
        var flag = false;
        if(decoded.utilizador._id == evento.id_utilizador) {
          flag = true
        }
        if(flag){
          var path = `./public/data/${decoded.utilizador._id}/eventos/${evento._id}`
          rimraf.sync(path);
          await Eventos.remover(req.body.id_evento)
                      .then(dados => {
                        res.json(dados)
                      })
                      .catch(erro => res.status(500).jsonp(erro))
        } else {
          res.jsonp({message: "impossivel remover evento"})
        }
    } else {
      res.jsonp({message: "impossivel remover evento"})
    }
  } catch(err) {
    console.log(err)
  }
});

router.post('/atualizar',passport.authenticate(['isAluno','isDocente'],{session:false}),async (req,res)=>{
  const result = Eventos.validateEvento(req.body.evento)
  if(result.error){
    res.status(400).jsonp({message: result.error.details[0].message})
  } else {
    try {
      var decoded = jwt.verify(req.headers.authorization, 'pri1920');
      var evento = await Eventos.consultar(req.body.id)
                  .then(dados => evento = dados)
                  .catch(erro => res.status(500).jsonp(erro))
      if(evento.id_utilizador == decoded.utilizador._id) {
          Eventos.atualiza(req.body.evento,req.body.id)
              .then(dados => res.jsonp(dados))
              .catch(erro => res.status(500).send('Erro na atualização do Publicacao: ' + erro)) 
      } else {
          res.jsonp([])
      }
    } catch(err) {
      console.log(err)
    }
  }
})

router.get('/:id', passport.authenticate(['isAluno','isDocente'],{session:false}),async (req, res) => {
  await Eventos.consultar(req.params.id)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.post('/comparecer', passport.authenticate(['isAluno','isDocente'],{session:false}),async (req, res) => {
  try {
    var decoded = jwt.verify(req.headers.authorization, 'pri1920');
    var flag = null
    let user = {
      email_utilizador: decoded.utilizador.email,
      id_utilizador: decoded.utilizador._id
    }
    await Eventos.consultarUser(req.body.id,user)
          .then(dados => flag = dados)
          .catch(erro => res.status(500).jsonp(erro))
    if(flag==null) {
      let user = {
        email_utilizador: decoded.utilizador.email,
        id_utilizador: decoded.utilizador._id,
      }
      await Eventos.addUtilizador(user,req.body.id)
              .then(dados => res.jsonp(dados))
              .catch(erro => res.status(500).jsonp(erro))
    } else {
      await Eventos.removeUtilizador(user.id_utilizador)
                .then(dados => res.jsonp(dados))
                .catch(erro => res.status(500).jsonp(erro))
    }
  } catch(err) {
    console.log(err)
  }
});

router.post('/registo', passport.authenticate(['isAluno','isDocente','isAdmin'],{session:false}),async (req, res) => {
  const result = Eventos.validateEvento(req.body.data)
  try {
    var decoded = jwt.verify(req.headers.authorization, 'pri1920');
    if(result.error){
      res.status(400).jsonp({message: result.error.details[0].message})
    } else {
      let evento = {
        tipo: req.body.data.tipo,
        titulo: req.body.data.titulo,
        data: req.body.data.data,
        visivilidade: req.body.data.visivilidade,
        hora: req.body.data.hora,
        descricao: req.body.data.descricao,
        local: req.body.data.local,
        email_utilizador: decoded.utilizador.email,
        id_utilizador: decoded.utilizador._id,
        utilizadores: []
      }
      if(req.body.data.uc != '') {
        evento.uc = req.body.data.uc
      }
      if(req.body.data.duracao != '') {
        evento.duracao = req.body.data.duracao
      }
      var flag = false
      var eventoAux = ""
      await Eventos.inserir(evento)
            .then(dados => {
              eventoAux = dados
              if(req.body.files.length > 0) {
                flag = true
              } else {
                res.jsonp(dados)
              }
            })
            .catch(erro => {
              res.status(500).jsonp(erro)
              flag = false
            })

      if(flag) {
        var dirpath = `./public/data/${decoded.utilizador._id}/eventos/${eventoAux._id}`
        await fs.promises.mkdir(dirpath, { recursive: true }, function (err) {
          if (err) console.log(err)
        })
        var files = []
        for(let i=0; i < req.body.files.length; i++) { 
          let oldPath = `./${req.body.files[i].path}`
          let newPath = `./public/data/${decoded.utilizador._id}/eventos/${eventoAux._id}/${req.body.files[i].originalname}`
          fs.renameSync(oldPath, newPath, function (err) {
            if (err) console.log(err)
          })
          let date = new Date()
          let file = {
            data: date,
            name: req.body.files[i].originalname,
            path: newPath,
            mimetype: req.body.files[i].mimetype,
            size: req.body.files[i].size
          }
          files.push(file)
        }
        if(files.length > 0) {
          await Eventos.addAnexos(files,eventoAux._id)
            .then(dados => {
                res.jsonp(dados)
            })
            .catch(erro => {
              res.status(500).jsonp(erro)
            })
        } 
      }
    }
  } catch(err) {
    console.log(err)
  }
});


/////////////////////////////////////////////////////////
/////////////////////// Publica /////////////////////////
/////////////////////////////////////////////////////////  

router.get('/listar/publicas', (req, res) => {
  Eventos.listarPublicas()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
