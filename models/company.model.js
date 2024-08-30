const mongoose = require('mongoose');



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
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    sub_price : {
        type:Number,
        required: true,
   },
},{timestamps:true})

const Company = mongoose.model('Company', companySchema);


module.exports = {Company};