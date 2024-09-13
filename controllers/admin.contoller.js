const {Userrole} = require('../models/userrole.model.js');


const createuser =  async(req,res) =>{
    const WUpdatingrole =  req.user.role;
    if(!WUpdatingrole=='admin' ){
        return res.status(409).json(
            {
                message: "Unknown user Trying to update"
            }
        )
      }

      const{name,contact,email,role} = req.body;
      const userexist = await Userrole.findOne({email,contact,role});
      if(userexist){
        return res.status(409).json(
            {
                message: "User Already exists"
            }
        )
      }
      

      const id = req.user._id;
      const user =  await Userrole.create({
        name,
        contact,
        email,
        role,
        admin:id
      })
       
      if(user){
        return res.status(409).json(
            {
                message: "User Added successfully",
                status: user
            }
        )
    }
}

const deleteuser = async(req,res) => {
    const WUpdatingrole =  req.user.role;
 
    const id = req.query.id;
    console.log(`id ${id}`);

    if(!WUpdatingrole=='admin'){
        return res.status(409).json(
            {
                message: "Unknown user Trying to update"
            }
        )
      }
    const user  = await Userrole.findById(id);   
    
    if(!user){
        return res.status(404).send('user not found');
    }

   
    await Userrole.findByIdAndDelete(id);

    return res.status(204).send("user deleted successfully");

}

const updateuser = async(req,res) => {
    const WUpdatingrole =  req.user.role;
    if(!WUpdatingrole=='admin'){
        return res.status(409).json(
            {
                message: "Unknown user Trying to update"
            }
        )
      }
    const id = req.query.id;
    const {email,contact,role} = req.body;
    try {
        const user = await Userrole.findById(id);
        
        if (!user) {
            return res.status(404).send('user not found');
        }
        
        if(email){Userrole.email = email;}
        if(contact){Userrole.contact = contact;}
        if(role){Userrole.role = role;}

        await Userrole.save();
      
        return res.status(200).json(
            {
                message: "updated the user deatil successfully"
            }
        )
    }
    catch (err) {
        res.status(500).send('Error updating courier details');
    }
}

module.exports = {createuser,deleteuser,updateuser};