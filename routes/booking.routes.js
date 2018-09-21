let express = require('express') ;
let router = express.Router() ;
let BookingCtrl = require('../controllers/booking.controller')
router.route('/book').post(BookingCtrl.bookHotel)

module.exports = router ;
