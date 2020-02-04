var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// Get home page
router.get('/', async (req, res, next) => {
  jwt.verify(req.session.token, 'pri1920', async (err, decoded) => {
    if(err) {
        req.session.destroy()
        await axios.get(`http://localhost:4000/api/publicacao/listar/publicas`)
            .then(dados => {  res.render('index',{ publicacoes: dados.data})  })
            .catch(erro => {
                    console.log('Erro ao gerar página inicial: ' + erro)
            })
    } else {
      if(decoded.utilizador.tipoUtilizador == 'Admin') {
         res.redirect('/admin')
      } else {
        if(decoded.utilizador.tipoUtilizador == 'Docente' || decoded.utilizador.tipoUtilizador == 'docente') {
          res.redirect('/docente')
        } else {
          if(decoded.utilizador.tipoUtilizador == 'Aluno' || decoded.utilizador.tipoUtilizador == 'aluno') {
              res.redirect('/aluno')
          }
        }
      }
    }
  })
})

// Lista dos eventos públicos
router.get('/eventos/publicas', async (req, res, next) => {
  await axios.get(`http://localhost:4000/api/evento/listar/publicas`)
      .then(dados => {  res.render('index',{ eventos: dados.data})  })
      .catch(erro => {
              console.log('Erro ao gerar página inicial: ' + erro)
      })
})

// Lista das publicações públicas
router.get('/publicacoes/publicas', async (req, res, next) => {
  await axios.get(`http://localhost:4000/api/publicacao/listar/publicas`)
      .then(dados => {  res.render('index',{ publicacoes: dados.data})  })
      .catch(erro => {
              console.log('Erro ao gerar página inicial: ' + erro)
      })
})

// Sobre page
router.get('/sobre', (req, res) => {
  res.render('sobre')
})

// Contactos page
router.get('/contactos', (req, res) => {
  res.render('contactos')
})

// Login page
router.get('/login', function(req, res) {
  res.render('login');
});

// Registo page
router.get('/registo', function(req, res) {
  res.render('registo');
});

// Autenticar utilizador
router.post('/login', async (req,res,next) => {
  passport.authenticate('login', async (err,user,info) => {
      try {
          console.log("Info:", info.message)
          if(err || !user){
              const error = new Error('An Error Occured')
              res.render('login', {message: info.message})
              //return res.redirect('/login')
          }
          req.login(user, {session:false}, async (error) => {
              if(error) return next(error)
              const myutilizador = { _id: user._id, email: user.email, tipoUtilizador: user.tipoUtilizador } 
              const token = jwt.sign({ utilizador: myutilizador }, 'pri1920', { expiresIn: '8h' })

              req.user.token = token
              req.session.token = token
              req.session.save();
              
              if(myutilizador.tipoUtilizador == 'Admin') {
                    return res.redirect('/admin')
              } else {
                if(myutilizador.tipoUtilizador == 'Docente' || myutilizador.tipoUtilizador == 'docente') {
                    return res.redirect('/docente')
                } else {
                  if(myutilizador.tipoUtilizador == 'Aluno' || myutilizador.tipoUtilizador == 'aluno') {
                    return res.redirect('/aluno')
                  }
                }
              }
          })
      } catch (error) {
          return next(error)
      }
  }) (req,res,next)
})

// Registar utilizador gramatica
router.post("/registo", upload.single('imagem'), async function(req, res) {
  const data = {
    data: req.body,
    image: req.file
  }
  await axios.post('http://localhost:4000/api/utilizador/registo', data)
          .then(dados => {
              res.redirect('/')
          })
          .catch(erro => {
              res.render('registo', {message: erro.response.data.message})
              console.log(erro.message)
          })
})

// Registar utilizador
router.post("/registo/ficheiro", upload.single('ficheiro'), async function(req, res) {
  await axios.post('http://localhost:4000/api/utilizador/registo/ficheiro', req.file)
          .then(dados => {
              res.redirect('/')
          })
          .catch(erro => {
              res.render('registo', {message: erro.response.data.message})
              console.log(erro.message)
          })
})

// Logout
router.get('/logout',(req,res) => {
  req.session.destroy()
  req.logout()
  res.redirect('/')
})

module.exports = router;
