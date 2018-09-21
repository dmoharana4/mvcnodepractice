const mongoose = require('mongoose') ;
var   BookingSchema  = mongoose.Schema({
  user_id : {type:'ObjectId',
              required:true} ,
  hotel_id :  {type:'ObjectId',
              required:true} ,
  date_of_booking : {type:Date ,
  default:Date.now()} ,
  days:Number ,
  members:Number
})

mongoose.model('BookingSchema',BookingSchema,'hotels.bookings')
