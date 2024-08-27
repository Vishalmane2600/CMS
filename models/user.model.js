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
    address:{
        type: String,
        required: true,
    },
    role:
    {
        type : String,
        required: true,
        enum: ['Admin','Dispatcher','Manager']
    }
},{timestamps:true});


const userComSche  =  new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Company'
    }
},{timestamps:true});


const User = mongoose.model('User',userSchema);
const UserCom = mongoose.model('UserCom',userComSche);

module.exports = User;
module.exports = UserCom;