const {Userrole} = require('../models/userrole.model.js');

const login =  async(req,res) =>{
    
      const{contact,email} = req.body;
     
      const userexist = await Userrole.findOne({email,contact});
    
      if(!userexist){
        return res.status(409).json(
            {
                message: "User Not Yet Registered"
            }
        )
      }
      
     const token = userexist.tokenGeneForRole();


     const options ={
           httpOnly:true,
           secure:true
     }

   return res.status(200).cookie("token",token,options).json(
       {
           message: "successfully login"
       }
   )
}

module.exports = {login};