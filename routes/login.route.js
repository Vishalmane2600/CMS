const Router =  require('express');

const {login} = require('../controllers/login.controller.js');

const router = Router();

router.route('/user/login').post(login);

module.exports = router;
