const Router = require('express');
const {userdetails,usercompany}  = require('../controllers/user.controller.js');

const router = Router();

router.route('/').post(userdetails);
//router.route('/add_company').post(usercompany);


module.exports = router;