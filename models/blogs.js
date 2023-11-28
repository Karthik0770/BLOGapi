const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        timestamps: true
    },
    content:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Blogs',blogSchema);