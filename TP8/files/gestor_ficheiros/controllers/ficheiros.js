var Ficheiro = require('../models/ficheiro')

module.exports.listar = () => {
    return Ficheiro
        .find()
        .exec()
}