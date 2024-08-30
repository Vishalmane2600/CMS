const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema  =  new mongoose.Schema({
    name:{
        type: String,
        required: true,
        lowercase: true
    },
    contact : {
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true});


userSchema.methods.tokengenerator = function() {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            contact: this.contact,
            address: this.address,
            email: this.email
        },
        process.env.JWT_SECRET, 
        { expiresIn: '1d' } 
    );
};

const User = mongoose.model('User',userSchema);

module.exports = {User};
