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

module.exports = userdetails;