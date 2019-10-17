const  mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    score:{
        type:String,
    },
    href:{
        type:String,
    },
    image:{
        type:String,
    },
    id:{
        type:String
    }
})

const Movies = mongoose.model('movies', movieSchema)

module.exports = Movies

