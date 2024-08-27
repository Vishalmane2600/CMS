const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const userRoute = require('../routes/user.route.js')



// Middlewares 


app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())


// Routes

app.use('/users',userRoute);


module.exports = app;