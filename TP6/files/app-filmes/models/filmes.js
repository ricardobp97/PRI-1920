const mongoose = require('mongoose')

var filmeSchema = new mongoose.Schema({
    title: String,
    year: Number,
    cast: [String],
    genres: [String]
})

module.exports = mongoose.model('filme', filmeSchema)