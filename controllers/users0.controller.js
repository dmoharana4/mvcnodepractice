var mongoose = require("mongoose");
// let dbconn = require('../models/db.connection') ;
let Users = mongoose.model('UsersSchema');

module.exports.getusers = (req, res) => {
  var offset = 0;
  var limit = 10;
  let query = req.query
  // if(query.offset && query.limit){
  //   offset = query.offset ;
  //   limit = query.limit ;
  // }

  Users.find().skip(offset).limit(limit).exec((err, dbres) => {
    if (err) {
      res.status(404).send('some problem in getting the database')
    } else {
      res.status(200).json(dbres);
    }
  });
};


module.exports.getuser = (req, res, next) => {
  var id = req.query.id;
  console.log(id);
  Users.findById(id).exec((err, dbres) => {
    if (err) {
      console.log("cannot find error");
      res.status(404).send("some error occured while finding query");
    } else {
      res.status(200).json(dbres)
    }
  })
};


module.exports.adduser = (req, res) => {
  if (req.body.name && req.body.password) {
    var newuser = req.body;
    Users.create(newuser).exec((err, dbres) => {
      if (err) {
        res.status(404).send("some error in inserting data")
      } else {
        res.status(200).json(dbres);
      }
    })
  } else {
    res.status(404).send('please fill all the required details')
  }
};



module.exports.updateuser = (req, res , next) => {
  var user = req.body
var filter = {name : user.name} ;
var update = {$set:{pass:user.pass}}
if(req.body.name && req.body.pass){
  Users.updateOne(filter,update,(err,dbres)=>{
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
if(req.body && req.body.name){
Users.deleteOne(filter,(err,dbres)=>{
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


// var offset  = 0;
// var limit = 1 ;
// module.exports.getusers = (req, res) => {
//   var collection = dbconn.get().db(dbname).collection('usersdata');
//   let query = {}
//   collection.find(query).skip(offset).limit(limit).toArray((err,dbres)=>{
//     if(err){
//       res.status(404).send('some problem in getting the database')
//     }else{
//       res.status(200).json(dbres) ;
//     }
//   });
// };
//
//
//
// module.exports.getuser = (req, res) => {
//   var collection = dbconn.get().db("socially").collection('usersdata');
//   let query = {name:req.query.name}
//   collection.findOne(query,(err,dbres)=>{
//     if(err){
//       res.status(404).send('some problem in getting the database')
//     }else{
//       res.status(200).send(dbres) ;
//     }
//   });
// };
//
//
// module.exports.adduser = (req, res) => {
// var newuser = req.body  ;
// var collection = dbconn.get().db("socially").collection('usersdata') ;
// if(req.body && req.body.name && req.body.pass){
// collection.insertOne(newuser,(err,dbres)=>{
//   if(err){
//     res.status(404).send("some error in inserting data")
//   }else{
//     res.status(200).json(dbres);
//   }
// })
// }else{
//   res.status(404).send('please fill all the required details')
// }
// };
//
// module.exports.updateuser = (req, res , next) => {
//   var collection = dbconn.get().db("socially").collection("usersdata");
//   var user = req.body
// var filter = {name : user.name} ;
// var update = {$set:{pass:user.pass}}
// if(req.body && req.body.name && req.body.pass){
//   collection.updateOne(filter,update,(err,dbres)=>{
//     if(err){
//       res.status(404).send("some problem while updating data"+err)
//     }else{
//       res.status(200).json(dbres)
//     }
//   })
// }else{
//   res.status(404).send('please fill all the required details')
// }
// };
//
// module.exports.removeuser = (req, res) => {
// var filter = {name:req.body.name};
// var collection = dbconn.get().db("socially").collection('usersdata');
// if(req.body && req.body.name){
// collection.deleteOne(filter,(err,dbres)=>{
//   if(err){
//     res.status(404).send("error while deleting the data") ;
//   }else{
//     res.status(200).json(dbres);
//   }
// })
// }else{
//   res.status(404).send('please fill the required fields')
// }
// };
