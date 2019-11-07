var Actores = require('../models/filmes')

module.exports.listarActores = () => {
    return Actores
        .aggregate([{$unwind: "$cast"},{$group: {_id: "$cast", numFilmes: {$sum: 1}}},{$sort: {numFilmes: -1}}])
        .exec()
}