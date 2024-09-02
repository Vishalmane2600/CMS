const mongoose = require('mongoose');

const adminSchema =  new mongoose.Schema({
 
  role:{
   type: String,
   required : true
  },
  user_id:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required: true,
 },
  company_id :
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    unique: true,
  }
  
},
{
    timestamps: true
})

const Admin = mongoose.model('Admin', adminSchema);


module.exports = {Admin};