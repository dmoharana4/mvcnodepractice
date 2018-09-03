let express =  require('express') ;
var router = express.Router() ;
var usersctrl = require('../controllers/users.controller');
router.route('/users').get(usersctrl.users);
module.exports = router ;
