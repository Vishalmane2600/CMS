

const {Admin} = require('../models/admin.model.js')

const { MongoClient, ObjectId } = require('mongodb');
// Middleware or function to extract user ID from JWT
const checkUserIsAdmin = async(req,res,next) => {
    try {
       const id =  req.userid;
       console.log(`token ${id}`);
       const user =  await Admin.findOne({user_id: id});
       console.log(`user token ${user}`);
       if(!user) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
       }
       req.user = user;
       console.log(`admin mid ${req.user}`);  
        next();
    } catch (err) {
        console.error('Invalid token:', err);
        return null; 
    }
};

module.exports = checkUserIsAdmin;
