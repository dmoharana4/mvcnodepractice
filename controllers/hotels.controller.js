var mongoose = require("mongoose") ;
var Hotel = mongoose.model('HotelSchema') ;
var ObjectId = require('mongodb').ObjectId ;

//Hotel.create(insertionobject , function(err,res){})
//Hotel.insertMany(arrayofobjects , function(err,res){})
//Hotel.save(insertionobject , function(err,res){})

module.exports.getHotels = (req, res) => {
var offset = 0;
var count = 5;
if (req.query && req.query.offset && req.query.count) {
  offset = parseInt(req.query.offset, 10);
  count = parseInt(req.query.count, 10);
}


  Hotel.find().skip(offset).limit(count).exec((err,dbres)=>{
    if(err){
      res.status(404).send('some problem in getting the database')
    }else{
      res.status(200).json(dbres) ;
    }
  });
};

// module.exports.getHotelsData = (req,res,next) => {
//   var reqname = req.query.name ;
//   Hotel.findOne({name:reqname}).exec((err,hotel)=>{
//     if(err){
//       console.log("cannot find error");
//       res.status(404).send("some error occured while finding query");
//     }else{
//       res.status(200).json(hotel)
//     }
//   })
// };

module.exports.getHotelData = (req,res,next) => {
  var id = req.query.id ;
  console.log(id);
  Hotel.findById(id).exec((err,hotel)=>{
    if(err){
      console.log("cannot find error");
      res.status(404).send("some error occured while finding query");
    }else{
      res.status(200).json(hotel)
    }
  })
};

// module.exports.addHotel = (req,res,next) => {
//   var hotel = req.body ;
//   var collection = dbconn.get().db('socially').collection('postcalci');
// if(req.body && req.body.name && req.body.age && req.body.active){
//   collection.insertOne(hotel,(err,dbres)=>{
//     if(err){
//       console.log("something wrong with the database"+err);
//       res.status(200).send("some problem in inserting data"+err);
//     }else{
//       res.status(200).json(hotel);
//     }
//   })
// }else{
//   res.status(200).send("please fill all the from details");
// }
// };



module.exports.addHotel = (req,res,next) => {
if(req.body.name ){
  const hotel = new Hotel(req.body);
  Hotel.save((err,dbres)=>{
    if(err){
      console.log("something wrong with the database"+err);
      res.status(200).send("some problem in inserting data"+err);
    }else{
      res.status(200).json(dbres);
    }
  })
}else{
  res.status(200).send("please fill all the from details");
}
};

// module.exports.updateHotel = (req,res,next) => {
//   var hotel = req.body ;
//   console.log(hotel);
//   var collection = dbconn.get().db('socially').collection('postcalci');
//   if(hotel && hotel.filter && hotel.age && hotel.active){
//   let query = {name : hotel.filter} ;
//   let newvalues = {$set:{age : hotel.age , active : hotel.active}} ;
//   collection.updateOne(query,newvalues,(err,dbres)=>{
//     if(err){
//       res.status(200).send("there is some error in updating db");
//     }else{
//       res.status(200).json(dbres);
//     }
//   })
// }else{
//   res.status(404).send("please fill all the required info")
// }
// };


module.exports.updateHotel = (req,res,next) => {
  var hotel = req.body ;
  console.log(hotel);
  if(hotel.name && hotel.age && hotel.active){
  let query = {name : hotel.filter} ;
  let newvalues = {$set:{age : hotel.age , active : hotel.active}} ;
  Hotel.updateOne(query,newvalues,(err,dbres)=>{
    if(err){
      res.status(200).send("there is some error in updating db");
    }else{
      res.status(200).json(dbres);
    }
  })
}else{
  res.status(404).send("please fill all the required info")
}
};

module.exports.removeHotel = (req,res,next) => {
  var hotel = req.body ;
  console.log(hotel);
  if(hotel.filter ){
    let query ={name:hotel.filter}  ;
    Hotel.deleteOne(query,(err,dbres)=>{
      if(err){
        res.status(404).send("some problem while removing data") ;
      }else{
        res.status(200).json(dbres)
      }
    })
  }else{
    res.status(404).send('please fill all the required fields')
  }

};
