let express =  require('express') ;
var router = express.Router() ;
var hotelctrl = require('../controllers/hotels.controller');
let userctrl = require('../controllers/userAuth.controller.js')
router
.route('/hotels')
.get(userctrl.validateToken,hotelctrl.getHotels) ;
router
.route('/allhotels')
.get(userctrl.validateToken,hotelctrl.getAllHotels) ;

router
.route('/hotel')
// .get(userctrl.validateToken,hotelctrl.getHotelData)
.post(userctrl.validateToken,hotelctrl.addHotel)
.patch(userctrl.validateToken,hotelctrl.updateHotel)
.delete(userctrl.validateToken,hotelctrl.removeHotel);

router
.route('/hotel/:id')
.get(userctrl.validateToken,hotelctrl.getHotelData);

module.exports = router ;
