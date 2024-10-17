const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const userRoute = require('../routes/user.route.js')
const adminRoute =  require('../routes/admin.route.js')
const loginuserRoute = require('../routes/login.route.js')
const managerRoute = require('../routes/manger.route.js')
const reportRoute = require('../routes/report.route.js')
const upload = require('../middlewares/csv.multer.js');

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
app.use('/admin',adminRoute);
app.use('/userlogin',loginuserRoute);
app.use('/manager',managerRoute);
app.use('/report',reportRoute);

module.exports = app;