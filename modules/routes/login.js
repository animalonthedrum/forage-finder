var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// var user = require('../user');
var bcrypt = require('bcrypt');



router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());


router.post('/', function(req, res) {
  console.log('base url post hit:', req.body);
  // connect to db?
  user.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      // err connecting
      console.log('find user error:', err);
      res.sendStatus(400);
    } // end error
    else {
      // connected
      // find user
      if (user !== undefined) {
        // user found, compare raw text to hash
        console.log('comparing:', req.body.password, user.password);
        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
          if (err) {
            // error with bcrypt
            console.log('compare error:', err);
            res.sendStatus(400);
          } else {
            // no error with bcrypt
            console.log('found u!');
            if (isMatch) {
              res.send(req.body.username);
            } else {
              res.send('no user');
            }
          }
        }); //end compare
      } //end found user
      else {
        console.log('no user found');
        res.send(400);
      }
    } // end no error
  }); //end looking for user
});

module.exports = router;
