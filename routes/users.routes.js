let express =  require('express') ;
var router = express.Router() ;
var usersctrl = require('../controllers/users.controller');
router.route('/users').get(usersctrl.getusers);
router.route('/user/')
.get(usersctrl.getuser)
.post(usersctrl.adduser)
.patch(usersctrl.updateuser)
.delete(usersctrl.removeuser);

module.exports = router ;
