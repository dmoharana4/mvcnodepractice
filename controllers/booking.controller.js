const mongoose = require('mongoose')
var User = mongoose.model('UsersSchema') ;
var Hotel = mongoose.model('HotelSchema') ;
var Booking = mongoose.model('BookingSchema')

module.exports.bookHotel = async (req,res,next)=>{
  //first get the user and get the hotel
  //check whether the user is available or not
  //if user is new create the user
  //now check for the hotel by its name
  //if hotel is available get the hotel id
  //now add the booking object

  let qbody = req.body  ;
  if(qbody.hotelname && qbody.username && qbody.days && qbody.members){
    let hotelId = await GetByName("name",qbody.hotelname ,Hotel) ;
    let UserId = await GetByName("name",qbody.username , User)
    console.log(hotelId +"....."+ UserId);
    if (hotelId && UserId) {
      let bookingData = {
        'hotel_id':hotelId ,
        'user_id':UserId ,
        'days':qbody.days ,
        'members':qbody.members
      }
      Booking.create(bookingData,(err,dbres)=>{
        if(err){
          res.status(500).send("sorry could not save booking data try again"+err)
        }else{
          res.status(200).json(dbres) ;
        }
      })

    }
  }else{
    res.status(400).send("please fill all the needed fields")
  }
}


 function GetByName(keyname,valuename , modelObj){
  // console.log('keyname   :'+keyname + " ...."+'valuename'+valuename);
  return new Promise((resolve,reject)=>{
    let query = {'name':valuename}
    console.log(query);
    modelObj.findOne(query , (err,dbres)=>{
      if(err){
        console.log("some eror in retrieving data from db");
      }else{
        return resolve(dbres['_id']);
        console.log("yes succea");
      }
    }) ;
  })
}
