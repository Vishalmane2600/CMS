const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const userRoute = require('../routes/user.route.js')
// const companyRoute = require('../routes/company.route.js');
const ejs =  require('ejs');

// Middlewares 

app.engine('html', ejs.renderFile);  
app.set('view engine', 'html');      
app.set('views', path.join(__dirname, './views'));  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(cookieParser());


// Routes

app.use('/user',userRoute);



module.exports = app;