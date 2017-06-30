var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../user');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

mongoose.connect('mongodb://heroku_4r3ww5t2:qntdijitkuavnb4m2i1bddquug@ds143342.mlab.com:43342/heroku_4r3ww5t2');

var mapSchema = new mongoose.Schema({

  username: String,
  lat: Number,
  lon: Number,
  details: String,
  title: String,
  mode: Boolean,
  timeStamp: Date

});

var maps = mongoose.model('maps', mapSchema);

router.post('/', function(req, res) {
  console.log('in items.js, post to /, req.body is:', req.body);
  var info = {
    lat: req.body.lat,
    lon: req.body.lon,
    details: req.body.description,
    title: req.body.title,
    username: req.body.placer,
    timeStamp: req.body.date,
    mode: req.body.mode

  };
  maps(info).save();
  res.send(200);
}); //end post

router.get('/', function(req, res) {
  console.log('get req:', req);
  maps.find().then(function(response) {
    res.send(response);
  });
});



module.exports = router;
