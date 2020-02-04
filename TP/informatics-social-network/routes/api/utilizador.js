var express = require('express');
var router = express.Router();
const fs = require('fs')
var passport = require('passport')
var jwt = require('jsonwebtoken')

////////////////////////// Gramatica ANTLR4 ///////////////////////////////////////////////
var antlr4 = require('antlr4');
var RegisterLexer = require('../../public/grammar/RegisterLexer').RegisterLexer;
var RegisterParser = require('../../public/grammar/RegisterParser').RegisterParser;
var RegisterListener = require('../../public/grammar/RegisterParserListener').RegisterParserListener;
var RegisterVisitor = require('../../public/grammar/RegisterParserVisitor').RegisterParserVisitor;   
///////////////////////////////////////////////////////////////////////////////////////////

const Utilizadores = require('../../controllers/utilizador')


// Inserir utilizador
router.post('/registo', async (req, res) => {
  const result = Utilizadores.validateUtilizador(req.body.data)
  if(result.error){
    res.status(400).jsonp({message: result.error.details[0].message})
    // console.log(result.error.details)
  } else if(!req.body.image) {
    res.status(400).jsonp({message: 'Fotografia de pefil obrigatória'})
  } else {
    var u = await Utilizadores.consultar(req.body.data.email)
    if(!u){
      let data = new Date()
      var image = {}
      if(req.body.image) {
          image = {
            data: data,
            name: req.body.image.originalname,
            path: req.body.image.path,
            mimetype: req.body.image.mimetype,
            size: req.body.image.size,
        }
      }
      let user = {
        data: req.body.data
      }
      user.data.ativo = 0
      if(req.body.image) {
        user.image = image
      }
      var flag = false
      var utilizador = ""
      await Utilizadores.inserir(user)
          .then(dados => {
              res.jsonp(dados)
              if(dados.fotografia) {
                flag = true;
                utilizador = dados
              }
          })
          .catch(erro => {
              flag = false;
              res.status(500).jsonp({message: 'Erro na inserção do Utilizador !'})
          })

        if(flag) {
          var dirpath = `./public/data/${utilizador._id}/perfil`
          var dirpathEventos = `./public/data/${utilizador._id}/eventos`
          var dirpathPublicacoes = `./public/data/${utilizador._id}/publicacoes`
          await fs.promises.mkdir(dirpath, { recursive: true }, function (err) {
            if (err) console.log(err)
          })
          await fs.promises.mkdir(dirpathEventos, { recursive: true }, function (err) {
            if (err) console.log(err)
          })
          await fs.promises.mkdir(dirpathPublicacoes, { recursive: true }, function (err) {
            if (err) console.log(err)
          })
          let oldPath = `./${utilizador.fotografia.path}`
          let newPath = `./public/data/${utilizador._id}/perfil/${utilizador.fotografia.name}`
          fs.renameSync(oldPath, newPath, function (err) {
            if (err) console.log(err)
          })
          let photo = {
            data: utilizador.fotografia.data,
            name: utilizador.fotografia.name,
            path: newPath,
            mimetype: utilizador.fotografia.mimetype,
            size: utilizador.fotografia.size
          }
          await Utilizadores.renamePathImageProfile(photo,utilizador._id)
              .then(dados => {
                console.log(dados)
            })
            .catch(erro => {
                res.status(500).jsonp({message: 'Erro na inserção do Utilizador !'})
            })
        }
    }
    else{
      console.log('Utilizador: ' + u.email + ' ja existe...')
      res.status(400).jsonp({message: 'Email já foi utilizado !'})
    }
  }
})

// Inserir utilizador por ficheiro
router.post('/registo/ficheiro', async (req, res) => { 
  let oldPath = `./${req.body.path}`
  let newPath = `./public/temps/${req.body.originalname}`
  fs.renameSync(oldPath, newPath, function (err) {
    if (err) console.log(err)
  })
  var data = fs.readFileSync(newPath).toString();
  fs.unlinkSync(newPath, function (err) {
    if (err) console.log(err);
  }); 

  // gramatica antlr4
  var input = data;
  var chars = new antlr4.InputStream(input);
  var lexer = new RegisterLexer(chars);
  var tokens = new antlr4.CommonTokenStream(lexer);
  var parser = new RegisterParser(tokens);
  parser.buildParseTrees = true;
  var tree = parser.registo();

  var visitor = new RegisterVisitor();
  visitor.visitRegisto(tree)

  var user = JSON.parse(visitor.getUser())

  const result = Utilizadores.validateUtilizador(user)
  if(result.error){
    res.status(400).jsonp({message: result.error.details[0].message})
  } else {
    var u = await Utilizadores.consultar(user.email)
    if(!u){ 
      user.ativo = 0
      var utilizador = null
      await Utilizadores.inserirNoFotografia(user)
              .then(dados => {
                  utilizador = dados
              })
              .catch(erro => {
                  res.status(500).jsonp({message: 'Erro na inserção do Utilizador !'})
              })
      if(utilizador != null) {
          var dirpath = `./public/data/${utilizador._id}/perfil`
          var dirpathEventos = `./public/data/${utilizador._id}/eventos`
          var dirpathPublicacoes = `./public/data/${utilizador._id}/publicacoes`
          await fs.promises.mkdir(dirpath, { recursive: true }, function (err) {
            if (err) console.log(err)
          })
          await fs.promises.mkdir(dirpathEventos, { recursive: true }, function (err) {
            if (err) console.log(err)
          })
          await fs.promises.mkdir(dirpathPublicacoes, { recursive: true }, function (err) {
            if (err) console.log(err)
          })
          res.json(utilizador)
      } else {
        res.status(401).jsonp({message: 'Erro a criar diretorias !'})
      }
    } else{
      console.log('Utilizador: ' + u.email + ' ja existe...')
      res.status(400).jsonp({message: 'Email já foi utilizado !'})
    }
  }
})

/////////////////////////////////////////
///////////////// Admin ///////////////// 
/////////////////////////////////////////

// Inserir um admin
// router.post('/registoAdmin', async (req, res) => {
//   var u = await Utilizadores.consultar(req.body.email)
//   if(!u){
//     await Utilizadores.inserirAdmin(req.body)
//         .then(dados => {
//             res.jsonp(dados)
//         })
//         .catch(erro => {
//             res.status(500).jsonp({message: 'Erro na inserção do Utilizador admin !'})
//         })
//   }
//   else{
//     console.log('Utilizador: ' + u.email + ' ja existe...')
//     res.status(400).jsonp({message: 'Email já foi utilizado !'})
//   }
// })

// Rota da api para listar todos  os utilizadores
router.get('/listar',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
  Utilizadores.listar()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na listagem dos Utilizadores: ' + erro))
})

// Rota da api para listar os utilizadores por tipo
router.get('/listar/tipo/:tipo',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
  Utilizadores.listarUtilizadorTipo(req.params.tipo)
      .then(dados => { res.jsonp(dados)})
      .catch(erro => res.status(500).send('Erro na listagem dos Utilizadores: ' + erro))
})

// Rota da api para consutar um utilizador na base de dados
router.get('/atualizar/:email',passport.authenticate('isAdmin',{session:false}),(req,res)=>{
  Utilizadores.consultar(req.params.email)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na obtenção do Utilizador: ' + erro))
})

// Rota da api para atualizar um utilizador na base de dados
router.post('/atualizarAdmin',passport.authenticate('isAdmin',{session:false}),(req,res)=>{
  Utilizadores.atualiza(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na atualização do Utilizador: ' + erro))
})

// Rota da api para remover um utilizador da base de dados
router.post('/remover',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
  Utilizadores.remove(req.body.email)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na remoção do Utilizador: ' + erro))
})

// Rota da api para atualizar estado de um utilizador na base de dados
router.post('/atualizar/estado',passport.authenticate('isAdmin',{session:false}),async (req,res)=>{
  var user = ""
  await Utilizadores.consultar(req.body.email)
        .then(dados => user = dados)
        .catch(erro => res.status(500).send('Erro na obtenção do Utilizador: ' + erro))
  let ativo = 0
  if(user.ativo == 0) {
    ativo = 1
  } else {
    ativo = 0
  }
  await Utilizadores.atualizaEstado(user._id,ativo)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na atualização do Utilizador: ' + erro))
})


/////////////////////////////////////////////////////////
///////////////// Aluno/Docente /////////////////////////
///////////////////////////////////////////////////////// 


router.post('/atualizar/fotoPerfil', passport.authenticate(['isAluno','isDocente'],{session:false}), async (req, res) => {  
  var img = req.body.fotografia
  try {
    var decoded = jwt.verify(req.headers.authorization, 'pri1920');
    var u = await Utilizadores.consultar(decoded.utilizador.email)
    if(u != null){
        if(u.fotografia) {
          let oldPhoto = u.fotografia.path
          let oldPath = `./${img.path}`
          let newPath = `./public/data/${decoded.utilizador._id}/perfil/${img.originalname}`
          var flag = true
          fs.renameSync(oldPath, newPath, function (err) {
            if (err) flag = false
          })
          if(flag) {
            let data = new Date()
            let photo = {
              data: data,
              name: img.originalname,
              path: newPath,
              mimetype: img.mimetype,
              size: img.size
            }
            await Utilizadores.renamePathImageProfile(photo,decoded.utilizador._id)
                  .then(dados => {
                    res.jsonp(dados)
                    fs.unlinkSync(oldPhoto, function (err) {
                        if (err) console.log(err);
                    }); 
                })
                .catch(erro => {
                    res.status(500).jsonp({message: 'Erro na inserção do Utilizador !'})
                }) 
          } else {
            res.jsonp([])
          }
        } else {
          let oldPath = `./${img.path}`
          let newPath = `./public/data/${decoded.utilizador._id}/perfil/${img.originalname}`
          var flag = true
          fs.renameSync(oldPath, newPath, function (err) {
            if (err) flag = false
          })
          if(flag) {
            let data = new Date()
            let photo = {
              data: data,
              name: img.originalname,
              path: newPath,
              mimetype: img.mimetype,
              size: img.size
            }
            await Utilizadores.renamePathImageProfile(photo,decoded.utilizador._id)
                  .then(dados => {
                    res.jsonp(dados)
                })
                .catch(erro => {
                    res.status(500).jsonp({message: 'Erro na inserção do Utilizador !'})
                }) 
          } else {
            res.jsonp([])
          }
        }
    } else {
      res.jsonp([])
    }
  } catch(err) {
    console.log(err)
  }
})

// Rota da api para consutar um utilizador na base de dados
router.get('/perfil',passport.authenticate(['isAluno','isDocente'],{session:false}),(req,res)=>{
  try {
    var decoded = jwt.verify(req.headers.authorization, 'pri1920');
    Utilizadores.consultar(decoded.utilizador.email)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na obtenção do Utilizador: ' + erro))
  } catch(err) {
    console.log(err)
  } 
})

// Rota da api para atualizar um utilizador na base de dados
router.post('/atualizar',passport.authenticate(['isAluno','isDocente'],{session:false}),(req,res)=>{
  Utilizadores.atualiza(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na atualização do Utilizador: ' + erro))
})

module.exports = router;
