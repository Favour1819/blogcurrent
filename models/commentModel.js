const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    message:{
        type: String,
        required:true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog'
    },

},{timestamps:true})

const comment = mongoose.model( "comments",commentSchema )
module.exports = comment