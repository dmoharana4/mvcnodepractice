var express = require('express');
var app = express();
var CONFIG = require('./config');
var path = require('path');
app.use(express.static(path.join(__dirname)))

var homeroute = require('./routes/home.routes');
var usersroute = require('./routes/users.routes');
var dataroute = require('./routes/data.routes');

app.use(homeroute);
app.use(usersroute);
app.use(dataroute);


app.listen(CONFIG.PORT,CONFIG.HOST,()=>{
  console.log('server started on port '+CONFIG.PORT);
})
