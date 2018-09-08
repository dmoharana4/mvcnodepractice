require('./models/db.connection').open();
var express = require('express');
var app = express();
var CONFIG = require('./config');
var path = require('path');
app.use(express.static(path.join(__dirname))) ;
var bodyParser = require('body-parser');


var homeroute = require('./routes/home.routes');
var usersroute = require('./routes/users.routes');
var dataroute = require('./routes/data.routes');
var hotelroute = require('./routes/hotels.routes');
app.use(bodyParser())
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.urlencoded({extended: false})


app.use(homeroute);
app.use(usersroute);
app.use(dataroute);
app.use(hotelroute);


app.listen(CONFIG.PORT,CONFIG.HOST,()=>{
  console.log('server started on port '+CONFIG.PORT);
})
