var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// var user = require('../user');
// var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

mongoose.connect('mongodb://heroku_bsck088f:s6lo3oobfgqnic05lf17vgacvc@ds157268.mlab.com:57268/heroku_bsck088f');
// 'mongodb://heroku_bsck088f:s6lo3oobfgqnic05lf17vgacvc@ds157268.mlab.com:57268/heroku_bsck088f'
// 'localhost:27017/forageFinder'

var mapSchema = new mongoose.Schema({

  username: String,
  lat: Number,
  lon: Number,
  details: String,
  title: String,
  options: String,
  timeStamp: Date,
  city: String,
  img: String

});

var maps = mongoose.model('maps', mapSchema);

router.post('/', function(req, res) {
  console.log('in items.js, post to /, req.body is:', req.body);
  var info = {
    lat: req.body.lat,
    lon: req.body.lon,
    // details: req.body.description,
    title: req.body.title,
    username: req.body.placer,
    timeStamp: req.body.date,
    options: req.body.options,
    city: req.body.city,
    img: req.body.img

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

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  maps.remove({
    _id: id
  }).then(function() {
    res.send(200);
  });

}); //end router.delete


module.exports = router;
