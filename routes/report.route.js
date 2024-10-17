const Router =  require('express');
const generateReport = require('../controllers/report.controller.js');
const router = Router();

router.route('/reportgen').get(generateReport);

module.exports = router;
