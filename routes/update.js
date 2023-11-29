const express = require('express')
const router = express.Router()
const Blogs = require('../models/blogs')
const data = require("../models/data.json");
const fs = require("fs");

router.put('/:id',async(req,res)=>{

    // JSON file
    if(req.body.content.length > 100) res.send({message:"You are over the character limit allowed for this field"})
    else if(req.body.content.length == 0 || req.body.title.length ==0 || req.body.author.length == 0) res.send({message:"Input values cannot be empty"})
    else{
        data[req.params['id']] = req.body
        fs.writeFile("./models/data.json",
            JSON.stringify(data),
            (e)=>{
                if(e) throw e;
                res.send({message: "Update Successfull"});
            }
        )
    }
    

    // MongoDB
    // try {
    //     const blog = await Blogs.findById(req.params['id'])
    //     blog.title = req.body.title;
    //     blog.content = req.body.content;
    //     blog.author = req.body.author;
    //     const snd = await blog.save()
    //     res.json(snd)
    // } catch (error) {
    //     res.send('Error')
    // }

})

module.exports = router