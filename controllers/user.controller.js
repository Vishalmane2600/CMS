const {User}  =  require('../models/user.model.js')
const {UserCom} = require('../models/user.model.js')

const userdetails = async (req ,res) => {
    const{ name , contact ,address,role} =  req.body;
    if([name,contact,address,role].some((each)=>each ===""))
        {
            return res.status(400).json(
                {
                    message: "All fields are required"
                }
            )
        }   

    const userExisted= await User.findOne({contact});

    if(userExisted){
        return res.status(409).json(
            {
                message: "Contact number already exists"
            }
        )
    }
    
    const user =  await User.create({
        name,
        contact,
        address,
        role,
       })
       if(!user){
        return res.status(500).json(
            {
                message: "Failed to create user"
            }
        )
       }

    return res.status(200).json(
        {
            user : user,
            message: "User created successfully"
        }
    )    
}

const usercompany = async(req,res) => {
       const {User_id,Company_id} = req.body;
       if([User_id,Company_id].some((each)=>each === ""))
       {
        return res.status(400).json(
            {
                message: "All fields are required"
            }
        )
       }
     const user  =  await UserCom.findOne({User_id});
     if(user){
        return res.status(409).json(
            {
                message: "User-Company relationship already exists"
            }
        )
     }

       const userCom = await UserCom.create({
        User_id,
        Company_id
       })

       if(!userCom){
        return res.status(500).json(
            {
                message: "Failed to create user company"
            }
        )
       }
       
       return res.status(200).json(
        {
            userCom : userCom,
            message: "Use-Company created successfully"
        }
       )

}
module.exports = {userdetails,usercompany};