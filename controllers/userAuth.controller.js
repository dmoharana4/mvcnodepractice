const mongoose = require('mongoose')
var User = mongoose.model('UsersSchema') ;
const bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken');
const CONFIG =require('../config')
var ObjectId = require('mongodb').ObjectId ;

module.exports.registration = (req,res,next)=>{
  let user = req.body
  console.log(user);
  if(user.name && user.email && user.password && user.phone){
    // var salt = bcrypt.genSaltSync(10);
  let hashPassword =  bcrypt.hashSync(user.password,15)
    var newUser = new User({
      name:user.name ,
      email:user.email ,
      password:hashPassword ,
      role:user.role ,
      phone :user.phone
    })

    newUser.save((err,dbres)=>{
      if(err){
        res.status(500).json({payload:"failed to register user "+err})
      }else{
        console.log(CONFIG.SECRETKEY);
        let token = jwt.sign({id:dbres['_id']},CONFIG.SECRETKEY)
        res.status(200).json({payload:dbres ,message:"registration success",
      auth:true , 'token':token} )
      }
    })
  }else{
    res.status(400).json({error:"please fill the all needed fields"})
  }
}


//----------------------------------------------------------------------------------

module.exports.login = (req,res,next)=>{
  let user = req.body
  if(user.email && user.password){
    User.findOne({email:user.email} , (err,dbres)=>{
      if(err){
        res.status(500).send("there was some errror in retrieving user data")
      }else{
        console.log(dbres.email + "..." + dbres.password );
        console.log(user.password);
      let loginflag =  bcrypt.compareSync(user.password,dbres.password) ;
      console.log(loginflag);
      if(loginflag){
        res.status(200).json({status:"successfull login" ,dbres});

      }else{
        res.status(403).send("you are not a valid user")
      }
        }
      })
  }else{
    res.status(400).send("please fill all details required")
  }
}



//-----------------------------------------------------------------------------------
//change password functionality

module.exports.changepassword = (req,res,next)=>{
  let user = req.body
  if(user.email && user.oldpassword && user.newpassword){
    User.findOne({'email':user.email},(err,dbres)=>{
      if(bcrypt.compareSync(user.oldpassword,dbres.password)){
        let condition = {'email':user.email} ;
        let newpass = bcrypt.hashSync(user.newpassword,15) ;
        let update = {'password':newpass }
        User.findOneAndUpdate(condition,update,(error,dbresponse)=>{
        if(err){
          res.status(500).send("some error in changing password"+err)
        }else{
          res.status(200).json(dbresponse)
        }
        })
      }else{
        res.status("details not valid ")
      }
    })
  }else{
    res.status(404).send("please fill all needed fields")
  }
}

//----------------------------------------------------------------------------------
module.exports.validateToken = (req,res,next)=>{
  var token  = req.headers.token ;
  if(token){
    jwt.verify(token,CONFIG.SECRETKEY,function(error,jwtres){
      if (error) {
        res.status(401).json({
          payload:{
            auth:false ,
            message:'unauthorized token please go away',
            token:null
          }
        })
      } else {
        console.log(jwtres);
        User.findById(Object(jwtres['id']),(err,dbres)=>{
          if (err) {
            res.status(500).json({
              payload:{
                auth:false ,
                message:'failed to get the data from server',
                token:null
              }
            })
          } else {
            // res.status(200).send("sucess tokenized"+dbres);
            next() ;
          }
        })
      }
    })
  }else{
    res.status(404).json({
      payload:{
        auth:false ,
        message:'token not found',
        token:null
      }
    })
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTI3ZjdlMmYxZmFmMzEwNGUxMDljYiIsImlhdCI6MTUzNzM3NjEyNn0.nppknRx76XkZYWiatI3IQerDA09p_c81tfgH5yqKD6w
// 5ba27f7e2f1faf3104e109cb
