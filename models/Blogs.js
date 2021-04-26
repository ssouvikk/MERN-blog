const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const ModelSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
})

module.exports = Blog = mongoose.model('blog', ModelSchema)
