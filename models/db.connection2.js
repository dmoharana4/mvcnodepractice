let mongoose = require('mongoose') ;
let CONFIG = require('../config') ;
require('./hotels.model') ;
require('./users.model') ;
require('./booking.model') ;

// const options = {
//   user: CONFIG.DBUSER ,
//   pass:CONFIG.DBPASS,
//   // authSource:CONFIG.DBAUTH,
//   useNewUrlParser: true
// }
// mongoose.connect(CONFIG.DBURL,options) ;
mongoose.connect(CONFIG.DBURL) ;

var dbConn = mongoose.connection ;



 dbConn.on('error',(error)=>{
  console.error('databse connection failed bro and the error is :'+error)
})
 dbConn.once('open',()=>{
  console.log('database connection success eith mongoose');
})

function graceshutdown(signal , callback){
  console.log("server shutting down because of "+ signal);
  callback() ;
}

dbConn.on('SIGINT',()=>{
  graceshutdown('SIGINT',function(){
    process.exit(0);
  })
})

dbConn.once('SIGTERM',()=>{
  graceshutdown('SIGTERM',function(){
    process.exit(0);
  })
})

dbConn.once('SIGUSR2',()=>{
  graceshutdown('SIGUSR2',function(){
    process.kill(process.pid,'SIGUSR2');
  })
})
