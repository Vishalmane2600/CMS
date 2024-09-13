const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');

const userRoleSchema  =  new mongoose.Schema({
    name:{
        type: String,
        required: true,
        lowercase: true
    },
    contact:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        required: true,
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    }
},{timestamps:true});


userRoleSchema.methods.tokenGeneForRole = function() {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            contact: this.contact,
            email: this.email,
            role: this.role,
            admin:this.admin,
        },
        process.env.JWT_SECRET, 
        { expiresIn: '10d'} 
    );
};

const Userrole = mongoose.model('Userrole',userRoleSchema);

module.exports = {Userrole};
