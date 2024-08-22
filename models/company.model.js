const mongoose = require('mongoose');


const subscriptionSchema = new mongoose.Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'user',
        },
       sub_price : {
            type:String,
             enum : ['Basic','Premium']
       },
       Company:{
         type:mongoose.Schema.Types.ObjectId,
         ref : 'company' 
       }

},{timestamps:true})

const companySchema = new mongoose.Schema({
     name: {
        type: String,
        required: true
    },
     address: {
        type: String,
        required: true
    },
     contact: {
        type:Number,
        required: true
    }
},{timestamps:true})

const Company = mongoose.model('Company', companySchema);
const userSub  = mongoose.model('userSub', subscriptionSchema); 
module.exports = {Company, userSub};