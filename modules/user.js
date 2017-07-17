var mongoose = require('mongoose');

mongoose.connect('mongodb://heroku_bsck088f:s6lo3oobfgqnic05lf17vgacvc@ds157268.mlab.com:57268/heroku_bsck088f');

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

var userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
