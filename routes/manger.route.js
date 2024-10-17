const Router =  require('express');
const {createcuriour,deletecuriour,updatecuriour} = require('../controllers/curiour.controller.js');
const checkUserRole =require('../middlewares/role.mid.js')


const router = Router();

router.route('/addcurior').post(checkUserRole,createcuriour);

router.route('/removecurior').delete(checkUserRole,deletecuriour);

router.route('/updatecurior').post(checkUserRole,updatecuriour);



module.exports = router;
