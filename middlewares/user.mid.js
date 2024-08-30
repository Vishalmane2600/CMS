const jwt = require('jsonwebtoken');

// Middleware or function to extract user ID from JWT
const getUserIdFromToken = (req,res,next) => {
    try {
        // Replace 'your_jwt_secret' with the secret you used to sign the token
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQwNzVhY2EwNjczY2EyMTZmZWY5ODYiLCJuYW1lIjoidmlzaGFsIG1hbmUiLCJjb250YWN0Ijo3NjY2Mzc5OTMwLCJhZGRyZXNzIjoiV2FyamUgUHVuZSIsImVtYWlsIjoib25lQGdtYWlsLmNvbSIsImlhdCI6MTcyNDkzNzY0NCwiZXhwIjoxNzI1MDI0MDQ0fQ.A2c6Fuhj3BNMeG_khME4PMafYRYqUPYQUrOl0An-pjU';
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Assuming the user ID is stored in the '_id' field in the token payload
        const userId = decoded._id;
        req.userid = userId;
        
        next();
    } catch (err) {
        console.error('Invalid token:', err);
        return null; 
    }
};

module.exports = getUserIdFromToken;