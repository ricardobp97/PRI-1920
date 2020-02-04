var createError = require('http-errors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var multer = require('multer');

var uuid = require('uuid/v4')
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var passport = require('passport')

require('./autenticacao/aut')

// Routes Config //

// views
var indexRouter = require('./routes/index');
var alunoRouter = require('./routes/aluno');
var adminRouter = require('./routes/admin');
var docenteRouter = require('./routes/docente');

// api
var apiUtilizadorRouter = require('./routes/api/utilizador')
var apiEventoRouter = require('./routes/api/evento')
var apiPublicacaoRouter = require('./routes/api/publicacao')

var app = express();

// Configuração Base de Dados
const config = {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Conexão a Base de Dados
mongoose
    .connect('mongodb://localhost:27017/informatics-social-network', config)
    .then(() => console.log('> Mongo Ready: ' + mongoose.connection.readyState))
    .catch((erro) => console.log('Mongo: erro na conexão: ' + erro))

// Sessions
app.use(session({
  genid: () =>{
    return uuid()
  },
  store: new FileStore({logFn: function(){}}),
  secret: 'pri1920',
  resave: false,
  saveUninitialized: false
}))

// Inicialização do passport
app.use(passport.initialize())
app.use(passport.session())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes define //

// views
app.use('/', indexRouter);
app.use('/aluno', alunoRouter);
app.use('/admin', adminRouter);
app.use('/docente', docenteRouter);

// api
app.use('/api/utilizador', apiUtilizadorRouter);
app.use('/api/publicacao', apiPublicacaoRouter);
app.use('/api/evento', apiEventoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
