const mongoose = require("mongoose") ;

//learning nested schema

var locationSchema = mongoose.Schema({
  address:String,
  coordinates:[Number],
});
var reviewSchema = mongoose.Schema({
  name:String,
  id:String,
  review:String,
  rating:Number
});

var roomsSchema= mongoose.Schema(
  {
    type:String,
    number:Number,
    description:String,
    photos:[String],
    price:Number
})

var hotelSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  stars:{
    type:Number,
    min:0,
    max:5,
    "default":0
  },
  description:String,
  photos:[String],
  currency:String,
  rooms:[roomsSchema],
  location:[locationSchema],
  review:[reviewSchema],
  services:[String]
});


mongoose.model('HotelSchema' , hotelSchema , 'hotels.hotelsdata') ;
