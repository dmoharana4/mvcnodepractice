let express =  require('express') ;
var router = express.Router() ;
// var usersctrl = require('../controllers/users.controller');
var usersctrl = require('../controllers/userAuth.controller');

// router.route('/users').get(usersctrl.getusers);
// router.route('/user')
// .get(usersctrl.getuser)
// .post(usersctrl.adduser)
// .patch(usersctrl.updateuser)
// .delete(usersctrl.removeuser);
router.route('/user/register')
.post(usersctrl.registration)
router.route('/user/login')
.post(usersctrl.login)
router.route('/user/settings').patch(usersctrl.validateToken,usersctrl.changepassword)
module.exports = router ;
