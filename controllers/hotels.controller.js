var dbconn = require('../models/db.connection');
var ObjectId = require('mongodb').ObjectId ;

module.exports.getHotelsData = (req,res,next) => {
  var reqname = req.query.name ;
  var collection = dbconn.get().db('socially').collection('postcalci');

  collection.findOne({name:reqname},(err,hotel)=>{
    if(err){
      console.log("cannot find error");
      res.status(404).send("some error occured while finding query");
    }else{
      res.status(200).json(hotel)
    }
  })
};

module.exports.addHotel = (req,res,next) => {
  var hotel = req.body ;
  var collection = dbconn.get().db('socially').collection('postcalci');

  collection.insertOne(hotel,(err,dbres)=>{
    if(err){
      console.log("something wrong with the database"+err);
      res.status(200).send("some problem in inserting data"+err);
    }else{
      res.status(200).json(hotel);
    }
  })
};
