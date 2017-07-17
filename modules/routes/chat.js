// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// mongoose.connect('localhost:27017/forageFinder');
// var messagesSchema = new mongoose.Schema({
//
//   body: String
// });
// var messagesModel = mongoose.model('messagesModel', messagesSchema);
//
// router.use(bodyParser.urlencoded({
//   extended: true
// }));
// router.use(bodyParser.json());
//
// router.get('/', function(req, res) {
//   console.log('messages get call');
//   messagesModel.find().then(function(results) {
//     res.send(results);
//   });
// }); //end messages get call
//
// router.post('/', function(req, res) {
//   console.log('in messages post:', req.body);
//   var messageToAdd = {
//
//     body: req.body.body
//   };
//   var newMessage = messagesModel(messageToAdd);
//   newMessage.save();
//   res.send('chat page');
// }); //end post
//
//
// router.delete('/:id', function(req, res) {
//   var id = req.params.id;
//   messagesModel.remove({
//     _id: id
//   }).then(function() {
//     res.send(200);
//   });
//
// }); //end router.delete
//
// module.exports = router;
