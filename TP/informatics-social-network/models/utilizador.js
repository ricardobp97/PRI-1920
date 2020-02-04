const mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var FicheiroSchema = new mongoose.Schema(
    {
        data: {type: String, required: true},
        name: {type: String, required: true},
        path: {type: String, required: true},
        mimetype: {type: String, required: true},
        size: {type: Number, required: true},
    },
    {
        _id: false
    }
)

var UtilizadorSchema = new mongoose.Schema(
    {
        nome: {type: String, required: true},
        curso: {type: String, required: true},
        local: {type: String, required: true},
        email: {type: String, required: true},
        tipoUtilizador: {type: String, required: true},
        genero: {type: String, required: true},
        password: {type: String, required: true},
        ativo: {type: Number },
        fotografia: {type: FicheiroSchema},
        anexos:[{type: FicheiroSchema}]
    }
)

UtilizadorSchema.methods.isValidPassword = async function(password){
    var user = this
    var compare = await bcrypt.compare(password,user.password)
    return compare
}

module.exports = mongoose.model('Utilizador',UtilizadorSchema,'utilizadores')