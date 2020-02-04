var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var jwt = require('jsonwebtoken')
var zip = require('express-easy-zip')
router.use(zip());


// Render da pagina do aluno
router.get('/',passport.authenticate('isAluno',{session:false}),(req, res) => {
    res.render('aluno')
})


////////////////////////////////////
////////////// Perfil //////////////
////////////////////////////////////

// Render da pagina de perfil
router.get('/perfil',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/utilizador/perfil`,{ headers: {"Authorization" : req.session.token}})
      .then(dados => {
          res.render('perfilAluno',{utilizador: dados.data})
      })
      .catch(erro => {
          res.render('aluno')
      })
})

// Atualizar foto de perfil
router.post("/atualizar/fotoPerfil", upload.single('fotografia'),passport.authenticate('isAluno',{session:false}), async function(req, res) {
  if(req.file) {
    const data = {
      fotografia: req.file
    }
    await axios.post('http://localhost:4000/api/utilizador/atualizar/fotoPerfil', data,{ headers: {"Authorization" : req.session.token}})
            .then(dados => {
                res.redirect('/aluno/perfil')
            })
            .catch(erro => {
              res.redirect('/aluno/perfil')
            }) 
  } else {
      res.redirect('/aluno/perfil')
  }
})

// Atualizar perfil
router.post('/perfil/atualizar',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.post('http://localhost:4000/api/utilizador/atualizar', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> 
            res.redirect('/aluno/perfil'))
        .catch(erro => {
            res.redirect('/aluno/perfil')
  })
})

// Exportar dados
router.get('/exportar',passport.authenticate('isAluno',{session:false}), async (req, res) => {
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

// Registo de uma publicacao
router.get('/publicacoes/registo',passport.authenticate('isAluno',{session:false}),(req, res) => {
  res.render('registoPublicacaoAluno')
})

// Atualizar publicacao
router.get('/publicacoes/atualizar/:id',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/publicacao/${req.params.id}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
            try {
              var decoded = jwt.verify(req.session.token, 'pri1920');
              if(decoded.utilizador._id == dados.data.id_utilizador) {
                res.render('atualizarPublicacaoAluno',{publicacao: dados.data, email_utilizador: decoded.utilizador.email}) 
              } else {
                res.redirect(`/aluno/publicacoes/${req.params.id}`)
              }
            } catch(err) {
              console.log(err)
            }
          })
          .catch(erro => {
            res.redirect(`/aluno/publicacoes/${req.params.id}`)
  })
})

// Atualizar publicacao
router.post('/publicacoes/atualizar',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  let data = {
    publicacao: req.body,
    id: req.query.id
  }
  await axios.post('http://localhost:4000/api/publicacao/atualizar', data,{ headers: {"Authorization" : req.session.token}})
        .then(()=> 
          res.redirect(`/aluno/publicacoes/${req.query.id}`))
        .catch(erro => {
          res.redirect(`/aluno/publicacoes/${req.query.id}`)
  })
})

// Registo de uma publicacao
router.post('/publicacao',upload.array('ficheiro'),passport.authenticate('isAluno',{session:false}),async (req, res) => {
  const data = {
    data: req.body,
    files: req.files,
  }
  await axios.post('http://localhost:4000/api/publicacao/registo', data,{ headers: {"Authorization" : req.session.token}})
        .then(dados => {
            res.redirect('/aluno/publicacoes/listar')
        })
        .catch(erro => {
            res.render('registoPublicacaoAluno', {message: erro.response.data.message})
            console.log(erro.message)
        })
})

// Listagem de publicacacoes
router.get('/publicacoes/listar',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get('http://localhost:4000/api/publicacao/listarAluno',{ headers: {"Authorization" : req.session.token}})
          .then(dados => {res.render('aluno',{publicacoes: dados.data}) })
          .catch(erro => {
              res.render('aluno')
  })
})

// Gosto em uma publicacao
router.post('/publicacoes/gosto',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.post('http://localhost:4000/api/publicacao/gosto',{id:req.query.id},{ headers: {"Authorization" : req.session.token}})
          .then(dados => { res.redirect(`/aluno/publicacoes/listar`) })
          .catch(erro => {
              res.redirect(`/aluno/publicacoes/listar`)
  })
})

// Publicacao individual
router.get('/publicacoes/:id',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/publicacao/${req.params.id}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
            try {
              var decoded = jwt.verify(req.session.token, 'pri1920');
              res.render('publicacaoAluno',{publicacao: dados.data, email_utilizador: decoded.utilizador.email}) 
            } catch(err) {
              console.log(err)
            }
          })
          .catch(erro => {
            res.redirect(`/aluno/publicacoes/listar`)
          })
})

// Adicionar comentario a publicacao
router.post('/publicacoes/:id/comentario',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  if(req.body.comentario != '') {
    let data = {  
      comentario: req.body.comentario,
      id_publicacao: req.params.id
    }
    await axios.post('http://localhost:4000/api/publicacao/comentario',data,{ headers: {"Authorization" : req.session.token}})
            .then(dados => { res.redirect(`/aluno/publicacoes/${req.params.id}`) })
            .catch(erro => {
              res.redirect(`/aluno/publicacoes/${req.params.id}`)
    })
  }
})

// Listagem de publicacoes por curso
router.get('/publicacoes/listar/curso',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/publicacao/aluno/listar/curso/${req.query.curso}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('aluno',{publicacoes: dados.data})})
          .catch(erro => {
              res.redirect(`/aluno/publicacoes/listar`)
          })
})

// Listagem de publicacoes por titulo
router.get('/publicacoes/listar/titulo',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/publicacao/aluno/listar/titulo/${req.query.titulo}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('aluno',{publicacoes: dados.data})})
          .catch(erro => {
              res.redirect(`/aluno/publicacoes/listar`)
          })
})

// Listagem de publicacoes por data
router.get('/publicacoes/listar/data',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/publicacao/aluno/listar/data?data=${req.query.data}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('aluno',{publicacoes: dados.data})})
          .catch(erro => {
              res.redirect(`/aluno/publicacoes/listar`)
          })
})

// Listagem de publicacoes por visivilidade
router.get('/publicacoes/listar/visivilidade',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/publicacao/aluno/listar/visivilidade/${req.query.visivilidade}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('aluno',{publicacoes: dados.data})})
          .catch(erro => {
              res.redirect(`/aluno/publicacoes/listar`)
          })
})

// Remover comenatario de uma publicacao
router.post('/publicacoes/comentario/remover',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  let data = {
    id_comentario: req.query.id,
    id_publicacao: req.query.idPub
  }
  await axios.post(`http://localhost:4000/api/publicacao/comentario/remover`,data,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.redirect(`/aluno/publicacoes/${req.query.idPub}`)
          })
          .catch(erro => {
             res.redirect(`/aluno/publicacoes/${req.query.idPub}`)
          })
})

// Remover publicacao
router.post('/publicacoes/remover',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  let data = {
    id_publicacao: req.query.id
  }
  await axios.post(`http://localhost:4000/api/publicacao/remover`,data,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.redirect(`/aluno/publicacoes/listar`)
          })
          .catch(erro => {
              res.redirect(`/aluno/publicacoes/listar`)
          })
})


/////////////////////////////////////
////////////// Eventos //////////////
/////////////////////////////////////

// Rendo a pagina de registo de um evento
router.get('/eventos/registo',passport.authenticate('isAluno',{session:false}),(req, res) => {
  res.render('registoEventoAluno')
})

// Atualizar evento GET
router.get('/eventos/atualizar/:id',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/${req.params.id}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
            try {
              var decoded = jwt.verify(req.session.token, 'pri1920');
              if(decoded.utilizador._id == dados.data.id_utilizador) {
                res.render('atualizarEventoAluno',{evento: dados.data, email_utilizador: decoded.utilizador.email}) 
              } else {
                res.redirect(`/aluno/eventos/${req.params.id}`)
              }
            } catch(err) {
              console.log(err)
            }
          })
          .catch(erro => {
            res.redirect(`/aluno/eventos/${req.params.id}`)
  })
})

// Atualizar evento POST
router.post('/eventos/atualizar',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  let data = {
    evento: req.body,
    id: req.query.id
  }
  await axios.post('http://localhost:4000/api/evento/atualizar', data,{ headers: {"Authorization" : req.session.token}})
        .then(()=> 
           res.redirect(`/aluno/eventos/${req.query.id}`))
        .catch(erro => {
          res.redirect(`/aluno/eventos/${req.query.id}`)
  })
})

// Registo de um evento
router.post('/evento',upload.array('ficheiro'),passport.authenticate('isAluno',{session:false}),async (req, res) => {
  const data = {
    data: req.body,
    files: req.files,
  }
  await axios.post('http://localhost:4000/api/evento/registo', data,{ headers: {"Authorization" : req.session.token}})
        .then(dados => {
            res.redirect('/aluno/eventos/listar')
        })
        .catch(erro => {
            res.render('registoEventoAluno', {message: erro.response.data.message})
        })
})

// Listagem de eventos
router.get('/eventos/listar',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get('http://localhost:4000/api/evento/listarAluno',{ headers: {"Authorization" : req.session.token}})
          .then(dados => {res.render('aluno',{eventos: dados.data}) })
          .catch(erro => {
              console.log('Erro na listagem do Utilizador: ' + erro)
              res.render('aluno')
  })
})

// Comparecer num evento
router.post('/eventos/comparecer',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.post('http://localhost:4000/api/evento/comparecer',{id:req.query.id},{ headers: {"Authorization" : req.session.token}})
          .then(dados => { res.redirect(`/aluno/eventos/listar`) })
          .catch(erro => {
            res.redirect(`/aluno/eventos/listar`)
  })
})

// Evento individual
router.get('/eventos/:id',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/${req.params.id}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
            try {
              var decoded = jwt.verify(req.session.token, 'pri1920');
              res.render('eventoAluno',{evento: dados.data, email_utilizador: decoded.utilizador.email}) 
            } catch(err) {
              console.log(err)
            }
          })
          .catch(erro => {
            res.redirect(`/aluno/eventos/listar`)
  })
})

// Listagem de eventos por titulo
router.get('/eventos/listar/titulo',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/aluno/listar/titulo/${req.query.titulo}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('aluno',{eventos: dados.data})})
          .catch(erro => {
              res.redirect(`/aluno/eventos/listar`)
          })
})

// Listagem de eventos por uc
router.get('/eventos/listar/uc',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/aluno/listar/uc/${req.query.uc}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('aluno',{eventos: dados.data})})
          .catch(erro => {
              res.redirect(`/aluno/eventos/listar`)
          })
})

// Listagem de eventos por visivilidade
router.get('/eventos/listar/visivilidade',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/aluno/listar/visivilidade/${req.query.visivilidade}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('aluno',{eventos: dados.data})})
          .catch(erro => {
            res.redirect(`/aluno/eventos/listar`)
          })
})

// Listagem de eventos por tipo
router.get('/eventos/listar/tipo',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/aluno/listar/tipo/${req.query.tipo}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('aluno',{eventos: dados.data})})
          .catch(erro => {
            res.redirect(`/aluno/eventos/listar`)
          })
})

// Listagem de eventos por data
router.get('/eventos/listar/data',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  await axios.get(`http://localhost:4000/api/evento/aluno/listar/data/${req.query.data}`,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.render('aluno',{eventos: dados.data})})
          .catch(erro => {
            res.redirect(`/aluno/eventos/listar`)
          })
})

// Remover evento
router.post('/eventos/remover',passport.authenticate('isAluno',{session:false}),async (req, res) => {
  let data = {
    id_evento: req.query.id
  }
  await axios.post(`http://localhost:4000/api/evento/remover`,data,{ headers: {"Authorization" : req.session.token}})
          .then(dados => {
              res.redirect(`/aluno/eventos/listar`)
          })
          .catch(erro => {
              res.redirect(`/aluno/eventos/listar`)
          })
})

module.exports = router;
