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
if(req.body && req.body.name && req.body.age && req.body.active){
  collection.insertOne(hotel,(err,dbres)=>{
    if(err){
      console.log("something wrong with the database"+err);
      res.status(200).send("some problem in inserting data"+err);
    }else{
      res.status(200).json(hotel);
    }
  })
}else{
  res.status(200).send("please fill all the from details");
}
};



module.exports.updateHotel = (req,res,next) => {
  var hotel = req.body ;
  console.log(hotel);
  var collection = dbconn.get().db('socially').collection('postcalci');
  if(hotel && hotel.filter && hotel.age && hotel.active){
  let query = {name : hotel.filter} ;
  let newvalues = {$set:{age : hotel.age , active : hotel.active}} ;
  collection.updateOne(query,newvalues,(err,dbres)=>{
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
  var collection = dbconn.get().db('socially').collection('postcalci');
  if(hotel && hotel.filter ){
    let query ={name:hotel.filter}  ;
    collection.deleteOne(query,(err,dbres)=>{
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
