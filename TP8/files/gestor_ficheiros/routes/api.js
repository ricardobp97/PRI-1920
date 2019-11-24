var express = require('express');
var router = express.Router();
const fs = require('fs')
var Ficheiros = require('../controllers/ficheiros')
var Ficheiro = require('../models/ficheiro')

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

/* GET home page. */
router.get('/ficheiros', function(req, res) {
  Ficheiros.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.post('/ficheiros', upload.array('ficheiro'), function(req,res){
  var errors = 0;
  var i;
  if(req.files.length>1){
    for (i = 0; i < req.files.length; i++){
      var oldPath = __dirname + '/../' + req.files[i].path
      var newPath = __dirname + '/../data/' + req.files[i].originalname
    
      fs.rename(oldPath,newPath, function(err){
        if(err) throw err
      })

      var data = new Date()

      var novoFicheiro = new Ficheiro({
        data: data.toISOString(),
        desc: req.body.desc[i],
        name: req.files[i].originalname,
        path: newPath,
        mimetype: req.files[i].mimetype,
        size: req.files[i].size
      })

      novoFicheiro.save(function(err, ficheiro){
        if(err) errors++
      })
    }
    if(errors > 0)
        res.status(500).jsonp(err)
      else
        res.redirect('/')
  }
  else{
    var oldPath = __dirname + '/../' + req.files[0].path
    var newPath = __dirname + '/../data/' + req.files[0].originalname
    
    fs.rename(oldPath,newPath, function(err){
      if(err) throw err
    })

    var data = new Date()

    var novoFicheiro = new Ficheiro({
      data: data.toISOString(),
      desc: req.body.desc,
      name: req.files[0].originalname,
      path: newPath,
      mimetype: req.files[0].mimetype,
      size: req.files[0].size
    })

    novoFicheiro.save(function(err, ficheiro){
      if(err) res.status(500).jsonp(err)
      else res.redirect('/')
    })
  }
})

module.exports = router;
