const mongoose  = require('mongoose');

const userSchema  =  new mongoose.Schema({
    name:{
        type: String,
        required: true,
        lowercase: true
    },
    contact : {
        type: Number,
        required: true,
        unique: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'company'
    },
    role:
    {
        type : String,
        required: true,
    }
},{timestamps:true});

