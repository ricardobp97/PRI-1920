var Pub = require('../models/pubs')

module.exports.listar = () => {
    return Pub
        .find({},{_id: 1, title: 1, year: 1, type: 1})
        .exec()
}

module.exports.listaUma = (i) => {
    return Pub
        .find({_id: i})
        .exec()
}

module.exports.tipos = () => {
    return Pub
        .distinct('type')
        .exec()
}

module.exports.listarPorAutor = (a) => {
    return Pub
        .find({authors: { $in: [a] }})
        .exec()
}

module.exports.listarPorTipo = (t) => {
    return Pub
        .find({type: t})
        .exec()
}

module.exports.listarPorTipoAno = (t,y) => {
    return Pub
        .find({type: t, year: { $gt: y }})
        .exec()
}

module.exports.autores = () => {
    return Pub
        .distinct('authors').sort()
        .exec()
}