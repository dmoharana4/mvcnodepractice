let express =  require('express') ;
var router = express.Router() ;
var datactrl = require('../controllers/data.controller');
router.route('/data').get(datactrl.data);

module.exports = router ;
