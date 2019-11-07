var Filme = require('../models/filmes')

module.exports.listar = () => {
    return Filme
        .find().sort({ "year": -1 }).limit(5000)
        .exec()
}

module.exports.listarAno = ano => {
    return Filme
        .find({"year": ano})
        .exec()
}

module.exports.listarPorActor = actor => {
    return Filme
        .find({cast: {$regex: actor, $options: 'i'}}).sort({ "year": -1 })
        .exec()
}

module.exports.listarPorGenero = genero => {
    return Filme
        .find({genres: {$regex: genero, $options: 'i'}}).sort({ "year": -1 })
        .exec()
}

module.exports.consultar = id => {
    return Filme
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = filme => {
    var novo = new Filme(filme)
    return novo.save()
}

module.exports.insereActor = (id,actor) => {
    return Filme
        .updateOne({ _id: id }, {$push : { cast: actor }})
}

module.exports.insereGenero = (id,genero) => {
    return Filme
    .updateOne({ _id: id }, {$push : { genres: genero }})
}

module.exports.remover = id => {
    return Filme
        .deleteOne({_id: id})
}

module.exports.removerActor = (id,actor) => {
    return Filme
        .updateOne({ _id: id }, {$pull : { cast: actor }})
}

module.exports.removerGenero = (id,genero) => {
    return Filme
        .updateOne({ _id: id }, {$pull : { genres: genero }})
}

module.exports.numFilmesActor = actor => {
    return Filme
        .find({cast: {$in: actor}}).countDocuments()
        .exec()
}

module.exports.numFilmesGenero = genero => {
    return Filme
        .find({genres: {$in: genero}}).countDocuments()
        .exec()
}