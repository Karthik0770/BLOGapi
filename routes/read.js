const express = require('express')
const router = express.Router()
const Blogs = require('../models/blogs')
const data = require("../models/data.json");

router.get('/',async(req,res) => {

    // JSON file
    res.send(data);

    // MongoDB
    // try {
    //     const allBlogs = await Blogs.find()
    //     res.status(200).json(allUsers)
    // } catch (error) {
    //     res.send("Error "+ error)
    // }

})

router.get('/:id',async(req,res)=>{

    // JSON file
    if(data[req.params['id']]==null) res.send({message:"Record matching the given id is not found"})
    else res.send(data[req.params['id']]);

    // MongoDB
    // try {
    //     const blog = await Blogs.findById(req.params['id'])
    //     res.send(blog) 
    // } catch (error) {
    //     res.send("Error "+ error)
    // }

})

module.exports = router