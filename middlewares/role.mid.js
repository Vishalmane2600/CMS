

const jwt = require('jsonwebtoken');

const checkUserRole = async(req,res,next) => {
    try {
       const token =  req.token;
       
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        
       const user = decoded;
       req.user = user;
       
       next();

       
    } catch (err) {
        console.error('Invalid token in role mid', err);
        return null; 
    }
};

module.exports = checkUserRole;
