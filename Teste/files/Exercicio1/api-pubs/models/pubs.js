const mongoose = require('mongoose')

var pubSchema = new mongoose.Schema({
    _id: String,
    type: String,
    authors: [String],
    title: String,
    booktitle: String,
    address: String,
    month: String,
    year: String,
    isbn: String,
    doi: String
})

module.exports = mongoose.model('pub', pubSchema)



/*{
    "_id" : ObjectId("5e1c79724e3a375f529c2b6a"),
    "type" : "inproceedings",
    "id" : "FR10",
    "authors" : [
            "Ricardo Freitas",
            "José Carlos Ramalho"
    ],
    "title" : "Significant Properties in the Preservation of Relational Databases",
    "booktitle" : "Research and Advanced Technology for Digital Libraries, 14th European Conference, ECDL2010",
    "address" : "Glasgow, UK",
    "month" : "09.06",
    "year" : "2010",
    "isbn" : "978-3-642-15463-8",
    "doi" : "http://hdl.handle.net/1822/13702"
}*/