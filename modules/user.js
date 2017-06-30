var mongoose = require('mongoose');

mongoose.connect('mongodb://heroku_4r3ww5t2:qntdijitkuavnb4m2i1bddquug@ds143342.mlab.com:43342/heroku_4r3ww5t2');

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

var userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
