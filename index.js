const express = require("express");
const app = express();
// const mongoose = require('mongoose');
const Blogs = require('./models/blogs');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT;
const data = require("./models/data.json");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pathName = "./models/data.json";
const readRoute = require("./routes/read")
const updateRoute = require("./routes/update")
const createRoute = require("./routes/create")
const deleteRoute = require("./routes/delete")

app.use('/create',createRoute)
app.use('/read',readRoute)
app.use('/update',updateRoute)
app.use('/delete',deleteRoute)

// Connecting to MongoDB
// mongoose.connect(process.env.DBURL);
// const con = mongoose.connection;
// con.on('open',()=>console.log("DB connected"));

app.listen(port, ()=>{
    console.log(`Api project is running at http://localhost:${port}`);
})