var Obra = require('../models/obras')

module.exports.listar = () => {
    return Obra
        .find()
        .exec()
}

module.exports.listarPorPeriodo = p => {
    return Obra
        .find({periodo: p})
        .exec()
}

module.exports.listarPorAno = a => {
    return Obra
        .find({anoCriacao: a})
        .exec()
}

module.exports.listarPorCompositor = c => {
    return Obra
        .find({compositor: c})
        .exec()
}

module.exports.listarCompositores = () => {
    return Obra
        .distinct('compositor')
        .exec()
}