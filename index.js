require('dotenv').config();
const  App = require('./src/app.js');
const connection_DB  = require('./database/dbconnect.js');


connection_DB().then((res) => {
    App.listen(8000,(req,res)=>{
        console.log('Server started on port 8000');
    })
}).catch((err) => {console.log("er")});