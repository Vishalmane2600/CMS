const Router =  require('express');
const{upload} = require('../middlewares/csv.multer.js');

const router  =  Router();

router.route('/addcsvcourior').post(upload.single('file'),);