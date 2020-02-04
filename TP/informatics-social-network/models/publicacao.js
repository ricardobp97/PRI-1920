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

var ComentarioSchema = new mongoose.Schema(
    {
        data: {type: String, required: true},
        descricao: {type: String, required: true},
        id_utilizador: {type: String, required: true},
        email_utilizador: {type: String, required: true},
    }
)

var PublicacaoSchema = new mongoose.Schema(
    { 
        email_utilizador: {type: String, required: true},
        id_utilizador: {type: String, required: true},
        titulo: {type: String, required: true},
        curso: {type: String, required: true},
        data: {type: String, required: true},
        descricao: {type: String, required: true},
        gostos: [{type: String}],
        comentarios: [{type: ComentarioSchema}],
        anexos:[{type: FicheiroSchema}],
        visivilidade: {type: Number, required: true},
    }
)

module.exports = mongoose.model('Publicacao',PublicacaoSchema,'publicacoes')