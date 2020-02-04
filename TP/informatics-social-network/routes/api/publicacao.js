var express = require('express');
var router = express.Router();
var passport = require('passport')
var jwt = require('jsonwebtoken')
const fs = require('fs')
const moment = require('moment');
var rimraf = require("rimraf");

const Publicacoes = require('../../controllers/publicacao')


/////////////////////////////////////////
///////////////// Admin ///////////////// 
/////////////////////////////////////////

router.get('/listar', passport.authenticate('isAdmin',{session:false}),(req, res) => {
  Publicacoes.listar()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});


/////////////////////////////////////////
///////////////// Aluno ///////////////// 
/////////////////////////////////////////

router.get('/listarAluno', passport.authenticate('isAluno',{session:false}),(req, res) => {
  Publicacoes.listarAlunos()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/aluno/listar/curso/:curso', passport.authenticate('isAluno',{session:false}),(req, res) => {
  Publicacoes.listarCursoAluno(req.params.curso)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/aluno/listar/data', passport.authenticate('isAluno',{session:false}),(req, res) => {
  Publicacoes.listarDataAluno(req.query.data)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/aluno/listar/titulo/:titulo', passport.authenticate('isAluno',{session:false}),(req, res) => {
  Publicacoes.listarTituloAluno(req.params.titulo)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/aluno/listar/visivilidade/:visivilidade', passport.authenticate('isAluno',{session:false}),async (req, res) => {
  if(req.params.visivilidade != -1) {
    await Publicacoes.listarVisivilidadeAluno(req.params.visivilidade)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  } else {
    await Publicacoes.listarAlunos()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  }
});


///////////////////////////////////////////
///////////////// Docente /////////////////
/////////////////////////////////////////// 

router.get('/listarDocente', passport.authenticate('isDocente',{session:false}),(req, res) => {
  Publicacoes.listarDocentes()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});


router.get('/docente/listar/curso/:curso', passport.authenticate('isDocente',{session:false}),(req, res) => {
  Publicacoes.listarCursoDocente(req.params.curso)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/docente/listar/titulo/:titulo', passport.authenticate('isDocente',{session:false}),(req, res) => {
  Publicacoes.listarTituloDocente(req.params.titulo)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/docente/listar/data', passport.authenticate('isDocente',{session:false}),(req, res) => {
  Publicacoes.listarDataDocente(req.query.data)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/docente/listar/visivilidade/:visivilidade', passport.authenticate('isDocente',{session:false}),async (req, res) => {
  if(req.params.visivilidade != -1) {
    await Publicacoes.listarVisivilidadeDocente(req.params.visivilidade)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  } else {
    await Publicacoes.listarDocentes()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  }
});


/////////////////////////////////////////
///////////////// Geral ///////////////// 
/////////////////////////////////////////

router.post('/atualizar',passport.authenticate(['isAluno','isDocente'],{session:false}),async (req,res)=>{
  const result = Publicacoes.validatePublicacao(req.body.publicacao)
  if(result.error){
    res.status(400).jsonp({message: result.error.details[0].message})
  } else {
    try {
      var decoded = jwt.verify(req.headers.authorization, 'pri1920');
      var pub = await Publicacoes.consultar(req.body.id)
                  .then(dados => pub = dados)
                  .catch(erro => res.status(500).jsonp(erro))
      if(pub.id_utilizador == decoded.utilizador._id) {
        Publicacoes.atualiza(req.body.publicacao,req.body.id)
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
  await Publicacoes.consultar(req.params.id)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.post('/gosto', passport.authenticate(['isAluno','isDocente'],{session:false}),async (req, res) => {
  try {
    var decoded = jwt.verify(req.headers.authorization, 'pri1920');
    var gostos = null
    await Publicacoes.consultarGostos(req.body.id,decoded.utilizador._id)
          .then(dados => gostos = dados)
          .catch(erro => res.status(500).jsonp(erro))
    
    if(gostos==null) {
      await Publicacoes.addGosto(decoded.utilizador._id,req.body.id)
              .then(dados => res.jsonp(dados))
              .catch(erro => res.status(500).jsonp(erro))
    } else {
      await Publicacoes.removerLike(decoded.utilizador._id,req.body.id)
              .then(dados => res.jsonp(dados))
              .catch(erro => res.status(500).jsonp(erro))
    }
  } catch(err) {
    console.log(err)
  }
});

router.post('/comentario', passport.authenticate(['isAluno','isDocente'],{session:false}),async (req, res) => {
  try {
    var decoded = jwt.verify(req.headers.authorization, 'pri1920');
    var date = new Date()
    const time = moment(date);
    let coment = {
      data: time.format("DD/MM/YY HH:mm"),
      descricao: req.body.comentario,
      email_utilizador: decoded.utilizador.email,
      id_utilizador: decoded.utilizador._id
    }
    await Publicacoes.addComentario(coment,req.body.id_publicacao)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
  } catch(err) {
    console.log(err)
  }
});

router.post('/comentario/remover', passport.authenticate(['isAluno','isDocente'],{session:false}),async (req, res) => {
  try {
    var pub = null
    var decoded = jwt.verify(req.headers.authorization, 'pri1920');
    await Publicacoes.consultar(req.body.id_publicacao)
          .then(dados => pub = dados)
          .catch(erro => res.status(500).jsonp(erro))
    
    if(pub != null) {
        var flag = false;
        for(let i=0; i<pub.comentarios.length && !flag; i++) {
          if(pub.comentarios[i].id_utilizador == decoded.utilizador._id){
            flag=true
          }
        }
        if(flag){
          await Publicacoes.removerComentario(req.body.id_comentario)
                      .then(dados => {
                        res.json(dados)
                      })
                      .catch(erro => res.status(500).jsonp(erro))
        } else {
          res.jsonp({message: "impossivel tirar comentario"})
        }
    } else {
      res.jsonp({message: "impossivel tirar comentario"})
    }
  } catch(err) {
    console.log(err)
  }
});

router.post('/remover', passport.authenticate(['isAluno','isDocente'],{session:false}),async (req, res) => {
  try {
    var pub = null
    var decoded = jwt.verify(req.headers.authorization, 'pri1920');
    await Publicacoes.consultar(req.body.id_publicacao)
          .then(dados => pub = dados)
          .catch(erro => res.status(500).jsonp(erro))
    
    if(pub != null) {
        var flag = false;
        if(decoded.utilizador._id == pub.id_utilizador) {
          flag = true
        }
        if(flag){
          var path = `./public/data/${decoded.utilizador._id}/publicacoes/${pub._id}`
          rimraf.sync(path);
          await Publicacoes.remover(req.body.id_publicacao)
                      .then(dados => {
                        res.json(dados)
                      })
                      .catch(erro => res.status(500).jsonp(erro))
        } else {
          res.jsonp({message: "impossivel remover publicacao"})
        }
    } else {
      res.jsonp({message: "impossivel remover publicacao"})
    }
  } catch(err) {
    console.log(err)
  }
});

router.post('/registo', passport.authenticate(['isAluno','isDocente'],{session:false}),async (req, res) => {
  const result = Publicacoes.validatePublicacao(req.body.data)
  try {
    var decoded = jwt.verify(req.headers.authorization, 'pri1920');
    if(result.error){
      res.status(400).jsonp({message: result.error.details[0].message})
    } else {
      var data = new Date()
      const time = moment(data);
      let publicacao = {
        titulo: req.body.data.titulo,
        curso: req.body.data.curso,
        descricao: req.body.data.descricao,
        visivilidade: req.body.data.visivilidade,
        data: time.format("DD/MM/YY HH:mm"),
        gostos: [],
        comentarios: [],
        email_utilizador: decoded.utilizador.email,
        id_utilizador: decoded.utilizador._id
      }
      var flag = false
      var publicacaoAux = ""
      await Publicacoes.inserir(publicacao)
            .then(dados => {
              publicacaoAux = dados
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
      }

      if(flag) {
        var dirpath = `./public/data/${decoded.utilizador._id}/publicacoes/${publicacaoAux._id}`
        await fs.promises.mkdir(dirpath, { recursive: true }, function (err) {
          if (err) console.log(err)
        })
        var files = []
        for(let i=0; i < req.body.files.length; i++) { 
          let oldPath = `./${req.body.files[i].path}`
          let newPath = `./public/data/${decoded.utilizador._id}/publicacoes/${publicacaoAux._id}/${req.body.files[i].originalname}`
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
          await Publicacoes.addAnexos(files,publicacaoAux._id)
            .then(dados => {
                res.jsonp(dados)
            })
            .catch(erro => {
              res.status(500).jsonp(erro)
            })
        }
      } 
    } catch(err) {
      console.log(err)
    }
});


///////////////////////////////////////////
///////////////// Publica ///////////////// 
///////////////////////////////////////////

router.get('/listar/publicas', (req, res) => {
  Publicacoes.listarPublicas()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
