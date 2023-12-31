const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    content:{
        type: String,
        required: true,
        maxlength: 100
    },
    author:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Blogs',blogSchema);