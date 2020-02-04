var passport = require('passport')
var localStrategy = require('passport-local').Strategy
var JWTstrategy = require('passport-jwt').Strategy
var ExtractJWT = require('passport-jwt').ExtractJwt
var UtilizadorModel = require('../models/utilizador')


// Login de Utilizador
passport.use('login',new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email,pass,done) => {
    try{
        const user = await UtilizadorModel.findOne({ email: email })

        if(!user){
            return done(null,false,{message: 'Utilizador não encontrado!'})
        }
        if(user.ativo == 0) {
            return done(null,false,{message: 'Utilizador não ativado!'})
        }
        var valida = await user.isValidPassword(pass)
        if(!valida) return done(null,false,{message: 'Password inválida!'})

        return done(null,user,{message: 'Utilizador autenticado!'})
    }
    catch(erro){
        done(erro)
    }
}))

// Configurar a serialização do utilizador
passport.serializeUser((user, done) => {
    done(null,user.email)
})
  
// Configurar a deserialização do utilizador
passport.deserializeUser(function( utilizador, done) {
    UtilizadorModel.findOne({email : utilizador.email}, function(err, user) {
        if (err) done(err, null);
        done(null, user)
    })
})
  
// Verificação do Token
var extractFromSession = (req) => {
    var token = null
    if(req && req.session) token = req.session.token
    if(!token && req.headers.authorization) token = req.headers.authorization
    return token
}

passport.use('isAdmin',new JWTstrategy({
    secretOrKey: "pri1920",
    jwtFromRequest: ExtractJWT.fromExtractors([extractFromSession]),
    passReqToCallback: true
},async(req,token,done)=>{
    try {
        if(token.utilizador.tipoUtilizador == 'Admin'){
            return done(null,token.utilizador)
        } 
        else{
            return done(null,false,{message: 'Não têm permissões para aceder a esta Página'})
        }
    } catch (error) {
        return done(erro)
    }
}))

passport.use('isDocente',new JWTstrategy({
    secretOrKey: "pri1920",
    jwtFromRequest: ExtractJWT.fromExtractors([extractFromSession])
},async(token,done)=>{
    try {
        if(token.utilizador.tipoUtilizador == 'Docente' || token.utilizador.tipoUtilizador == 'docente'){
            return done(null,token.utilizador)
        } 
        else{
            return done(null,false,{message: 'Não têm permissões para aceder a esta Página'})
        }
    } catch (error) {
        return done(erro)
    }
}))

passport.use('isAluno',new JWTstrategy({
    secretOrKey: "pri1920",
    jwtFromRequest: ExtractJWT.fromExtractors([extractFromSession])
},async(token,done)=>{
    try {
        if(token.utilizador.tipoUtilizador == 'Aluno' || token.utilizador.tipoUtilizador == 'aluno'){
            return done(null,token.utilizador)
        } 
        else{
            return done(null,false,{message: 'Não têm permissões para aceder a esta Página'})
        }
    } catch (error) {
        return done(erro)
    }
}))
