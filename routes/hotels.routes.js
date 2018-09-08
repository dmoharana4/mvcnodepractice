let express =  require('express') ;
var router = express.Router() ;
var hotelctrl = require('../controllers/hotels.controller');


router
.route('/hotels')
.get(hotelctrl.getHotelsData)
.post(hotelctrl.addHotel)
.patch(hotelctrl.updateHotel)
.delete(hotelctrl.removeHotel);

module.exports = router ;
