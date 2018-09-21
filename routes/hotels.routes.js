let express =  require('express') ;
var router = express.Router() ;
var hotelctrl = require('../controllers/hotels.controller');
let userctrl = require('../controllers/userAuth.controller.js')
router
.route('/hotels')
.get(hotelctrl.getHotels) ;

router
.route('/hotel')
.get(userctrl.validateToken,hotelctrl.getHotelData)
.post(hotelctrl.addHotel)
.patch(hotelctrl.updateHotel)
.delete(hotelctrl.removeHotel);

module.exports = router ;
