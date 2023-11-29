const express = require('express')
const router = express.Router()
const Blogs = require('../models/blogs')
const data = require("../models/data.json");
const fs = require("fs");

router.delete('/:id',async(req,res)=>{

    // JSON file
    delete data[req.params['id']];
    fs.writeFile("./models/data.json",
        JSON.stringify(data),
        (e)=>{
            if(e) throw e;
            res.send({message: "Record deleted"});
        }
    )

    // MongoDB
    // try {
    //     const blog = await Blogs.findById(req.params['id'])
    //     const snd = await blog.remove()
    //     res.json(snd)
    // } catch (error) {
    //     res.send('Error')
    // }
})

module.exports = router