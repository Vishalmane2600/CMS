const Router = require('express');
const {userdetails,usercompanyrender}  = require('../controllers/user.controller.js');
const {createOrder,success,failure} = require('../controllers/paymentController.js')
const getUserIdFromToken = require('../middlewares/user.mid.js')
const router = Router();

router.route('/register').post(userdetails);
router.route('/company/register').get(usercompanyrender);
router.route('/company/createOrder').post(getUserIdFromToken,createOrder);

//payment API

// router.route('/company/success').post(,success);
// router.route('/company/failure').post(failure);

module.exports = router;