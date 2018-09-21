const MongoClient = require('mongodb').MongoClient;
const DBCONF = require('../config') ;
const dbUrl = `mongodb://${DBCONF.DBAUTH}:${DBCONF.DBPASS}@192.168.1.30:27017/admin`;

var connection = null ;
function open(){
  MongoClient.connect(dbUrl,{authSource:"admin"},(error,client)=>{
    if(error){
      console.log('error in DB collection\n'+error);
    }else{
      connection = client ;
      console.log("connection success! ");
    }
  });
}
function get(){
  return connection ;
}

console.log(process.pid);
// connection.on('SIGKILL',()=>{
//   console.log("killed it gracefully");
// })
module.exports= {
  open:open ,
  get : get
}
