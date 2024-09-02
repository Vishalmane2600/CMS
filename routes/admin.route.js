const Router =  require('express');
const {createcuriour,deletecuriour,updatecuriour} = require('../controllers/admin.controller.js');
const  getUserIdFromToken = require('../middlewares/user.mid.js');
const checkUserIsAdmin = require('../middlewares/admin.mid.js');

const router = Router();

router.route('/addcourier').post(getUserIdFromToken,checkUserIsAdmin,createcuriour);

router.route('/removecourier').delete(deletecuriour);

router.route('/updatecourier').post(getUserIdFromToken,checkUserIsAdmin,updatecuriour);


module.exports = router;
