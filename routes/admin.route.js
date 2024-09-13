const Router =  require('express');
const {createuser,deleteuser,updateuser} = require('../controllers/admin.contoller.js');

const {createcuriour,deletecuriour,updatecuriour} = require('../controllers/curiour.controller.js');

const  getUserIdFromToken = require('../middlewares/user.mid.js');
const checkUserIsAdmin = require('../middlewares/admin.mid.js');


const router = Router();

router.route('/adduser').post(getUserIdFromToken,checkUserIsAdmin,createuser);

router.route('/removeuser').delete(getUserIdFromToken,checkUserIsAdmin,deleteuser);

router.route('/updateuser').post(getUserIdFromToken,checkUserIsAdmin,updateuser);

router.route('/addcurior').post(getUserIdFromToken,checkUserIsAdmin,createcuriour);

router.route('/deletecurior').post(getUserIdFromToken,checkUserIsAdmin,deletecuriour);

router.route('/updatecurior').post(getUserIdFromToken,checkUserIsAdmin,updatecuriour);


module.exports = router;
