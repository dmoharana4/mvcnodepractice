let dbconn = require('../models/db.connection') ;

var offset  = 0;
var limit = 1 ;
module.exports.getusers = (req, res) => {
  var collection = dbconn.get().db('socially').collection('usersdata');
  let query = {}
  collection.find(query).skip(offset).limit(limit).toArray((err,dbres)=>{
    if(err){
      res.status(404).send('some problem in getting the database')
    }else{
      res.status(200).json(dbres) ;
    }
  });
};
module.exports.getuser = (req, res) => {
};


module.exports.getuser = (req, res) => {
  var collection = dbconn.get().db('socially').collection('usersdata');
  let query = {name:req.query.name}
  collection.findOne(query,(err,dbres)=>{
    if(err){
      res.status(404).send('some problem in getting the database')
    }else{
      res.status(200).send(dbres) ;
    }
  });
};


module.exports.adduser = (req, res) => {
var newuser = req.body  ;
var collection = dbconn.get().db('socially').collection('usersdata') ;
if(req.body && req.body.name && req.body.pass){
collection.insertOne(newuser,(err,dbres)=>{
  if(err){
    res.status(404).send("some error in inserting data")
  }else{
    res.status(200).json(dbres);
  }
})
}else{
  res.status(404).send('please fill all the required details')
}
};

module.exports.updateuser = (req, res , next) => {
  var collection = dbconn.get().db('socially').collection("usersdata");
  var user = req.body
var filter = {name : user.name} ;
var update = {$set:{pass:user.pass}}
if(req.body && req.body.name && req.body.pass){
  collection.updateOne(filter,update,(err,dbres)=>{
    if(err){
      res.status(404).send("some problem while updating data"+err)
    }else{
      res.status(200).json(dbres)
    }
  })
}else{
  res.status(404).send('please fill all the required details')
}
};

module.exports.removeuser = (req, res) => {
var filter = {name:req.body.name};
var collection = dbconn.get().db('socially').collection('usersdata');
if(req.body && req.body.name){
collection.deleteOne(filter,(err,dbres)=>{
  if(err){
    res.status(404).send("error while deleting the data") ;
  }else{
    res.status(200).json(dbres);
  }
})
}else{
  res.status(404).send('please fill the required fields')
}
};
