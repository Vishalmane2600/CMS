const mongoose = require('mongoose');

const adminSchema =  new mongoose.Schema({
  user :{
     type : mongoose.Schema.Types.ObjectId,
     ref : 'User',
  },
  role:{
   type: String,
   required : true
  }  
  
},
{
    timestamps: true
})

const Admin = mongoose.model('Admin', adminSchema);


module.exports = {Admin};