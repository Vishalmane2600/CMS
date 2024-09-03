const jwt = require('jsonwebtoken');

// Middleware or function to extract user ID from JWT
const getUserIdFromToken = (req,res,next) => {
    try {
        // Replace 'your_jwt_secret' with the secret you used to sign the token
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ2YzlkOTNhMzAwODc1Y2U5NmQ0NTMiLCJuYW1lIjoidmlzaGFsIG1hbmUiLCJjb250YWN0Ijo3NjY2Mzc5OTMwLCJhZGRyZXNzIjoiV2FyamUgUHVuZSIsImVtYWlsIjoib25lQGdtYWlsLmNvbSIsImlhdCI6MTcyNTM1MjQwOSwiZXhwIjoxNzI2MjE2NDA5fQ.GpdCXRE421RCoZkoP1fvBOe6nyYwXoC9Qdl3uFBJJpE';
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Assuming the user ID is stored in the '_id' field in the token payload
        const userId = decoded._id;
        req.userid = userId;
        console.log(`user mid ${req.userid}`);
        next();
    } catch (err) {
        console.error('Invalid token:', err);
        return null; 
    }
};

module.exports = getUserIdFromToken;