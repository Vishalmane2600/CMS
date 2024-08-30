const {User}  =  require('../models/user.model.js')
const {Company} = require('../models/company.model.js')

const userdetails = async (req ,res) => {
    const{ name,contact,address,email,password} =  req.body;
    if([name,contact,address,email,password].some((each)=>each ===""))
        {
            return res.status(400).json(
                {
                    message: "All fields are required"
                }
            )
        }   

    const userExisted= await User.findOne({email});

    if(userExisted){
        return res.status(409).json(
            {
                message: "User already exists"
            }
        )
    }
    
    const user =  await User.create({
        name,
        contact,
        address,
        email,
        password
       })
       
       if(!user){
        return res.status(500).json(
            {
                message: "Failed to create user"
            }
        )
       }

       const token  = await user.tokengenerator();

      const options ={
            httpOnly:true,
            secure:true
      }
    return res.status(200).cookie("token",token,options).json(
        {
            user : user,
            message: "User created successfully"
        }
    )    
}

const usercompanyrender = async(req,res)=>{
        res.render("comReg");
}

module.exports = {userdetails,usercompanyrender};