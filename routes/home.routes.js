let express =  require('express') ;
var router = express.Router() ;
var homectrl = require('../controllers/home.controller');
router.route('/home').get(homectrl.home);

module.exports = router ;
