var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');

mongoose.connect('localhost:27017/forageFinder');
//
// mongodb://heroku_bsck088f:s6lo3oobfgqnic05lf17vgacvc@ds157268.mlab.com:57268/heroku_bsck088f'


var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

var userModel = mongoose.model('userModel', userSchema);

module.exports = router;
