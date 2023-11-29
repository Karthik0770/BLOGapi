const express = require('express')
const router = express.Router()
const Blogs = require('../models/blogs')
const data = require("../models/data.json");
const fs = require("fs");

router.post('/',async(req,res)=>{

    // JSON file
    const timestamp = Date.now().toString();
    if(req.body.content.length > 100) res.send({message:"You are over the character limit allowed for this field"})
    else if(req.body.content.length == 0 || req.body.title.length ==0 || req.body.author.length == 0) res.send({message:"Input values cannot be empty"}) 
    else {
        
        data[timestamp] = req.body;

        fs.writeFile("./models/data.json",
            JSON.stringify(data),
            (e)=>{
                if(e) throw e;
                res.send(data);
            }
        )
    }

    // MongoDB
    // const newBlog = new Blogs({
    //     title:req.body.title,
    //     content:req.body.content,
    //     author:req.body.author
    // })

    // try {
    //     const snd = await newBlog.save();
    //     res.json(snd);
    // } catch (error) {
    //     res.send("Error "+ error);
    // }

})

module.exports = router