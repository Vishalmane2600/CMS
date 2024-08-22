const mongoose =  require('mongoose');


const csvSchema = new mongoose.Schema({
    file : {
   type:String,
   required:true
    },
    userid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{timestamps:true});