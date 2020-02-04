const mongoose = require('mongoose')

var FicheiroSchema = new mongoose.Schema(
    {
        data: {type: String, required: true},
        name: {type: String, required: true},
        path: {type: String, required: true},
        mimetype: {type: String, required: true},
        size: {type: Number, required: true},
    }
)

var UserSchema = new mongoose.Schema(
    {
        email_utilizador: {type: String, required: true},
        id_utilizador: {type: String, required: true},
    }, 
    {
        _id: false
    }
)

var EventoSchema = new mongoose.Schema(
    {
        tipo: {type: String, required: true},
        titulo: {type: String, required: true},
        data: {type: String, required: true},
        local: {type: String, required: true},
        descricao: {type: String, required: true},
        uc: {type: String},
        duracao: {type: String},
        hora: {type: String, required: true},
        email_utilizador: {type: String, required: true},
        id_utilizador: {type: String, required: true},
        anexos:[{type: FicheiroSchema}],
        visivilidade: {type: Number, required: true},
        utilizadores: [{type: UserSchema}]
    }
)

module.exports = mongoose.model('Evento',EventoSchema,'eventos')