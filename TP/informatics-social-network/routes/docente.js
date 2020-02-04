var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var jwt = require('jsonwebtoken')
var zip = require('express-easy-zip')
router.use(zip());


// Render pagina inicial do docente
router.get('/',passport.authenticate('isDocente',{session:false}),(req, res) => {
    res.render('docente')
})


////////////////////////////////////
////////////// Perfil //////////////
////////////////////////////////////

// Render pagina de perfil do utilizador
router.get('/perfil',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/utilizador/perfil`,{ headers: {"Authorization" : req.session.token}})
      .then(dados => {
          res.render('perfilDocente',{utilizador: dados.data})
      })
      .catch(erro => {
          res.render('docente')
      })
})

// Atualizar foto de perfil do utilizador
router.post("/atualizar/fotoPerfil", upload.single('fotografia'),passport.authenticate('isDocente',{session:false}), async function(req, res) {
  if(req.file) {
    const data = {
      fotografia: req.file
    }
    await axios.post('http://localhost:4000/api/utilizador/atualizar/fotoPerfil', data,{ headers: {"Authorization" : req.session.token}})
            .then(dados => {
                res.redirect('/docente/perfil')
            })
            .catch(erro => {
                res.redirect('/docente/perfil')
            }) 
  } else {
    res.redirect('/docente/perfil')
  }
})

// Post para atualizar perfil
router.post('/perfil/atualizar',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.post('http://localhost:4000/api/utilizador/atualizar', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> 
            res.redirect('/docente/perfil'))
        .catch(erro => {
            res.redirect('/docente/perfil')
        })
})

// Exportar dados de um docente
router.get('/exportar',passport.authenticate('isDocente',{session:false}), async (req, res) => {
  try {
    var decoded = jwt.verify(req.session.token, 'pri1920');
    var path = `./public/data/${decoded.utilizador._id}`
    var folderName = `${decoded.utilizador.email}`
    res.zip({
        files: [
            {
              mode: 0755,
              comment: 'Zip with the content of your things',
              date: new Date()
            },
            // nome da pasta para fazer o zip
            { 
              path: path,
              name: folderName
            } 
        ],
        // nome do zip
        filename: "data.zip"
    })
  } catch(err) {
    console.log(err)
  }
})

/////////////////////////////////////////
////////////// Publicacoes //////////////
/////////////////////////////////////////

// Render da pagina de registo de publicacoes
router.get('/publicacoes/registo',passport.authenticate('isDocente',{session:false}),(req, res) => {
  res.render('registoPublicacaoDocente')
})

// Render da pagina individual para atualizar publicacao
router.get('/publicacoes/atualizar/:id',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/publicacao/${req.params.id}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
            try {
              var decoded = jwt.verify(req.session.token, 'pri1920');
              if(decoded.utilizador._id == dados.data.id_utilizador) {
                res.render('atualizarPublicacaoDocente',{publicacao: dados.data, email_utilizador: decoded.utilizador.email}) 
              } else {
                res.redirect(`/docente/publicacoes/${req.params.id}`)
              }
            } catch(err) {
              console.log(err)
            }
          })
          .catch(erro => {
              res.redirect(`/docente/publicacoes/${req.params.id}`)
          })
})

// Post da atualizacao da publicacao
router.post('/publicacoes/atualizar',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  let data = {
    publicacao: req.body,
    id: req.query.id
  }
  await axios.post('http://localhost:4000/api/publicacao/atualizar', data,{ headers: {"Authorization" : req.session.token}})
        .then(()=> 
            res.redirect(`/docente/publicacoes/${req.query.id}`))
        .catch(erro => {
            res.redirect(`/docente/publicacoes/${req.query.id}`)
        })
})

// Registo de uma publicacao
router.post('/publicacao',upload.array('ficheiro'),passport.authenticate('isDocente',{session:false}),async (req, res) => {
  const data = {
    data: req.body,
    files: req.files,
  }
  await axios.post('http://localhost:4000/api/publicacao/registo', data,{ headers: {"Authorization" : req.session.token}})
        .then(dados => {
            res.redirect('/docente/publicacoes/listar')
        })
        .catch(erro => {
            res.render('registoPublicacaoDocente', {message: erro.response.data.message})
        })
})

// Listar publicacoes para o docente
router.get('/publicacoes/listar',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get('http://localhost:4000/api/publicacao/listarDocente',{ headers: {"Authorization" : req.session.token}})
          .then(dados => {res.render('docente',{publicacoes: dados.data}) })
          .catch(erro => {
            res.render('docente')
          })
})

// Router de gosto de uma publicacao
router.post('/publicacoes/gosto',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.post('http://localhost:4000/api/publicacao/gosto',{id:req.query.id},{ headers: {"Authorization" : req.session.token}})
          .then(dados => {res.redirect(`/docente/publicacoes/listar`) })
          .catch(erro => {
              res.redirect('/docente/publicacoes/listar')
          })
})

// Publicacao individual
router.get('/publicacoes/:id',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/publicacao/${req.params.id}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
            try {
                var decoded = jwt.verify(req.session.token, 'pri1920');
                res.render('publicacaoDocente',{publicacao: dados.data, email_utilizador: decoded.utilizador.email}) 
            } catch(err) {
                console.log(err)
            }
          })
          .catch(erro => {
              res.redirect('/docente/publicacoes/listar')
          })
})

// Adicionar comentario a publicacao
router.post('/publicacoes/:id/comentario',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  if(req.body.comentario != '') {
    let data = {  
      comentario: req.body.comentario,
      id_publicacao: req.params.id
    }
    await axios.post('http://localhost:4000/api/publicacao/comentario',data,{ headers: {"Authorization" : req.session.token}})
            .then(dados => { res.redirect(`/docente/publicacoes/${req.params.id}`) })
            .catch(erro => {
                res.redirect(`/docente/publicacoes/${req.params.id}`)
            })
  }
})

// Listar publicacacoes por curso
router.get('/publicacoes/listar/curso',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/publicacao/docente/listar/curso/${req.query.curso}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('docente',{publicacoes: dados.data})})
          .catch(erro => {
              res.redirect('/docente/publicacoes/listar')
          })
})

// Listar publicacacoes por titulo
router.get('/publicacoes/listar/titulo',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/publicacao/docente/listar/titulo/${req.query.titulo}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('docente',{publicacoes: dados.data})})
          .catch(erro => {
              res.redirect('/docente/publicacoes/listar')
          })
})

// Listar publicacacoes por data
router.get('/publicacoes/listar/data',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/publicacao/docente/listar/data?data=${req.query.data}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('docente',{publicacoes: dados.data})})
          .catch(erro => {
              res.redirect('/docente/publicacoes/listar')
          })
})

// Listar publicacacoes por visivilidade
router.get('/publicacoes/listar/visivilidade',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/publicacao/docente/listar/visivilidade/${req.query.visivilidade}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('docente',{publicacoes: dados.data})})
          .catch(erro => {
              res.redirect('/docente/publicacoes/listar')
          })
})

// Remover comentario da publicacao
router.post('/publicacoes/comentario/remover',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  let data = {
    id_comentario: req.query.id,
    id_publicacao: req.query.idPub
  }
  await axios.post(`http://localhost:4000/api/publicacao/comentario/remover`,data,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.redirect(`/docente/publicacoes/${req.query.idPub}`)
          })
          .catch(erro => {
              res.redirect(`/docente/publicacoes/${req.query.idPub}`)
          })
})

// Remover publicacao
router.post('/publicacoes/remover',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  let data = {
    id_publicacao: req.query.id
  }
  await axios.post(`http://localhost:4000/api/publicacao/remover`,data,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.redirect(`/docente/publicacoes/listar`)
          })
          .catch(erro => {
              res.redirect(`/docente/publicacoes/listar`)
          })
})


/////////////////////////////////////
////////////// Eventos //////////////
/////////////////////////////////////

// Render da pagina de registo de evento
router.get('/eventos/registo',passport.authenticate('isDocente',{session:false}),(req, res) => {
  res.render('registoEventoDocente')
})

// Atualizar evento
router.get('/eventos/atualizar/:id',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/${req.params.id}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
            try {
              var decoded = jwt.verify(req.session.token, 'pri1920');
              if(decoded.utilizador._id == dados.data.id_utilizador) {
                res.render('atualizarEventoDocente',{evento: dados.data, email_utilizador: decoded.utilizador.email}) 
              } else {
                res.redirect(`/docente/eventos/${req.params.id}`)
              }
            } catch(err) {
              console.log(err)
            }
          })
          .catch(erro => {
              res.redirect(`/docente/eventos/${req.params.id}`)
  })
})

// Actualizar evento
router.post('/eventos/atualizar',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  let data = {
    evento: req.body,
    id: req.query.id
  }
  await axios.post('http://localhost:4000/api/evento/atualizar', data,{ headers: {"Authorization" : req.session.token}})
        .then(()=> 
            res.redirect(`/docente/eventos/${req.query.id}`))
        .catch(erro => {
            res.redirect(`/docente/eventos/${req.query.id}`)
  })
})

// Registar evento
router.post('/evento',upload.array('ficheiro'),passport.authenticate('isDocente',{session:false}),async (req, res) => {
  const data = {
    data: req.body,
    files: req.files,
  }
  await axios.post('http://localhost:4000/api/evento/registo', data,{ headers: {"Authorization" : req.session.token}})
        .then(dados => {
            res.redirect('/docente/eventos/listar')
        })
        .catch(erro => {
            res.render('registoEventoDocente', {message: erro.response.data.message})
        })
})

// Listagem de eventos
router.get('/eventos/listar',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get('http://localhost:4000/api/evento/listarDocente',{ headers: {"Authorization" : req.session.token}})
          .then(dados => {res.render('docente',{eventos: dados.data}) })
          .catch(erro => {
              res.render('docente')
  })
})

// Comparecer em eventos
router.post('/eventos/comparecer',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.post('http://localhost:4000/api/evento/comparecer',{id:req.query.id},{ headers: {"Authorization" : req.session.token}})
          .then(dados => { res.redirect(`/docente/eventos/listar`) })
          .catch(erro => {
            res.redirect(`/docente/eventos/listar`)
  })
})

// Evento individual
router.get('/eventos/:id',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/${req.params.id}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
            try {
              var decoded = jwt.verify(req.session.token, 'pri1920');
              res.render('eventoDocente',{evento: dados.data, email_utilizador: decoded.utilizador.email}) 
            } catch(err) {
              console.log(err)
            }
          })
          .catch(erro => {
              res.redirect(`/docente/eventos/listar`)
          })
})

// Listagem de eventos por titulo 
router.get('/eventos/listar/titulo',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/docente/listar/titulo/${req.query.titulo}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('docente',{eventos: dados.data})})
          .catch(erro => {
            res.redirect(`/docente/eventos/listar`)
          })
})

// Listagem de eventos por uc
router.get('/eventos/listar/uc',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/docente/listar/uc/${req.query.uc}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('docente',{eventos: dados.data})})
          .catch(erro => {
            res.redirect(`/docente/eventos/listar`)
          })
})

// Listagem de eventos por visivilidade
router.get('/eventos/listar/visivilidade',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/docente/listar/visivilidade/${req.query.visivilidade}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('docente',{eventos: dados.data})})
          .catch(erro => {
            res.redirect(`/docente/eventos/listar`)
          })
})

// Listagem de eventos por tipo
router.get('/eventos/listar/tipo',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/docente/listar/tipo/${req.query.tipo}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('docente',{eventos: dados.data})})
          .catch(erro => {
            res.redirect(`/docente/eventos/listar`)
          })
})

// Listagem de eventos por data
router.get('/eventos/listar/data',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/docente/listar/data/${req.query.data}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('docente',{eventos: dados.data})})
          .catch(erro => {
            res.redirect(`/docente/eventos/listar`)
          })
})

// Eventos remover
router.post('/eventos/remover',passport.authenticate('isDocente',{session:false}),async (req, res) => {
  let data = {
    id_evento: req.query.id
  }
  await axios.post(`http://localhost:4000/api/evento/remover`,data,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.redirect(`/docente/eventos/listar`)
          })
          .catch(erro => {
             res.redirect(`/docente/eventos/listar`)
          })
})

module.exports = router;
