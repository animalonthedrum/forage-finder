// requires
var express = require('express');
var app = express();
var index = require('./modules/routes/index');
var register = require('./modules/routes/register');
var login = require('./modules/routes/login');
var map = require('./modules/routes/mapIt');

// uses
app.use(express.static('public'));
app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/mapIt', map);



// globals
var port = process.env.PORT || 8675;

// spin up server
app.listen(port, function() {
  console.log('server up on:', port);
}); // end spin up
