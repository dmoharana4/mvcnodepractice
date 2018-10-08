const mongoose = require('mongoose')
var User = mongoose.model('UsersSchema') ;
const bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken');
const CONFIG =require('../config')
var ObjectId = require('mongodb').ObjectId ;

module.exports.registration = (req,res,next)=>{
  let user = req.body
  if(user.name && user.email && user.password && user.phone){
    // var salt = bcrypt.genSaltSync(10);
    if(!user.role){
      user.role='user';
    }
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
        let token = jwt.sign({id:dbres['_id']},CONFIG.SECRETKEY)
        res.status(200)
        .json({payload:{'user_id':dbres._id,'role':dbres.role} ,
          'message':"registration success",
          'auth':true ,
          'token':token,
         } )
      }
    })
  }else{
    res.status(400).json({error:"please fill the all needed fields"});
  }
}


//----------------------------------------------------------------------------------

module.exports.login = (req,res,next)=>{
  let user = req.body ;
  console.log(user);
  if(user.email && user.password){
    User.findOne({email:user.email} , (err,dbres)=>{
      if(err){
        res.status(500).send("there was some errror in retrieving user data")
      }else{
      let loginflag =  bcrypt.compareSync(user.password,dbres.password) ;
      console.log(loginflag);
      if(loginflag){
        let token = jwt.sign({id:dbres['_id']},CONFIG.SECRETKEY)
        res.status(200)
          .json({payload:{'user_id':dbres._id,'role':dbres.role} ,
                  'message':"login success",
                  'auth':true ,
                  'token':token
                 } );
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
          res.status(200)
          .json({payload:dbres ,
            message:"password successfully changed",
            auth:true ,
             'role':'user'
           } )
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
  var token  = req.headers['x-access-token'];
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
