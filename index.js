const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Blogs = require('./models/blogs');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT;
const data = require("./models/data.json");
const fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pathName = "./models/data.json";

// Connecting to MongoDB
mongoose.connect(process.env.DBURL);
const con = mongoose.connection;
con.on('open',()=>console.log("DB connected"));

// READ DATA
app.get('/read',async(req,res) => {

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

// READ ONE RECORD WITH ID
app.get('/read/:id',async(req,res)=>{

    // JSON file
    res.send(data[req.params['id']]);

    // MongoDB
    // try {
    //     const blog = await Blogs.findById(req.params['id'])
    //     res.send(blog) 
    // } catch (error) {
    //     res.send("Error "+ error)
    // }

})

// PostMan body for creating record
// {
//     "title":"How to train your dragon",
//     "content":"Just train it",
//     "author":"anonymous"
// }

// CREATE/ WRITE DATA
app.post('/create',async(req,res)=>{

    // JSON file
    const timestamp = Date.now().toString();
    data[timestamp] = req.body;
    fs.writeFile("./models/data.json",
        JSON.stringify(data),
        (e)=>{
            if(e) throw e;
            res.send(data);
        }
    )

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

// UPDATE DATA
app.put('/update/:id',async(req,res)=>{

    // JSON file
    data[req.params['id']] = req.body
    fs.writeFile("./models/data.json",
        JSON.stringify(data),
        (e)=>{
            if(e) throw e;
            res.send(data);
        }
    )

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

// DELETE DATA
app.delete('/delete/:id',async(req,res)=>{

    // JSON file
    delete data[req.params['id']];
    fs.writeFile(pathName,
        JSON.stringify(data),
        (e)=>{
            if(e) throw e;
            res.send(data);
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

app.listen(port, ()=>{
    console.log(`Api project is running at http://localhost:${port}`);
})