vice // require('./models/db.connection').open();
require('./models/db.connection2');
var express = require('express');
var app = express();
var CONFIG = require('./config');
var path = require('path');
const log4js = require("log4js") ;
let  startuplog= log4js.getLogger('startup')
log4js.configure('./config/log4js.json')
try{
  require('fs').mkdirSync('./log')
}catch(error){
  if(error.code !='EEXIST'){
    console.error("could not setup log directory",error);
  }
}
app.use(express.static(path.join(__dirname))) ;
// adding logger to express
app.use(log4js.connectLogger(log4js.getLogger('http'),{level:"auto"}))
app.use((req,res,next)=>{
  console.log("hit :"+req.method + " "+req.url);
  next();
})
var bodyParser = require('body-parser');


var homeroute = require('./routes/home.routes');
var usersroute = require('./routes/users.routes');
var dataroute = require('./routes/data.routes');
var hotelroute = require('./routes/hotels.routes');
var bookingroute = require('./routes/booking.routes')
app.use(bodyParser())
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.urlencoded({extended: false})
app.use(bodyParser.json())


app.use(homeroute);
app.use(usersroute);
app.use(dataroute);
app.use(hotelroute);
app.use(bookingroute)

app.listen(CONFIG.PORT,CONFIG.HOST,()=>{
  startuplog.info('magic happens on port CONFIG.PORT') ;
  startuplog.info('server started on port '+CONFIG.PORT)

  // console.log('server started on port '+CONFIG.PORT);
})
