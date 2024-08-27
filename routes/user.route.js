const Router = require('express');
const userdetails  = require('../controllers/user.controller.js');



const router = Router();

router.route('/user_reg').post(userdetails);


module.exports = router;