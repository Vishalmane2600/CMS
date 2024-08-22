const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();


app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())


app.get('/home',(req,res)=>{
    res.send("your are On Home Page");
})

module.exports = app;