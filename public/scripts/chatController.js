myApp.controller('chatController', chatController);

function chatController(forageService) {
  var vm = this;
  //get messages
  vm.getMessages = function() {
    console.log('in controller, getMessages');
    forageService.retrieveMessages().then(function() {
      vm.messages = forageService.data;
      console.log('back in controller with:', vm.messages);
    });
  }; //end getMessages

  vm.sendMessage = function() {
    // used to toggle name input
    vm.body = '';
    if (!vm.hasName) {
      vm.hasName = true;
    }

    if (vm.body === '') {
      swal({
        title: "Empty Message!",
        text: "Please enter a message to send",
        imageUrl: "https://vignette3.wikia.nocookie.net/hhwa/images/2/21/Forage.png/revision/latest?cb=20150324094419"
      });
    } // end empty message
    else {
      // create object to send
      var newMessage = {

        body: vm.body
      }; // end newMessage
      console.log('in controller sending:', newMessage);
      forageService.newMessage(newMessage).then(function() {
        console.log('back in controller after post');
        vm.getMessages();
        vm.body = '';
      });
    } // end message exists
  };

  vm.deleteMessage = function(index) {
    console.log('message to delete:', index);
    forageService.deleteMessage(index).then(function() {
      console.log('back in controller', forageService.deletedMessage);
      vm.delete = forageService.deletedMessage;
      // swal({
      //   title: "Are you Sure?!",
      //   text: "Delete Message!",
      //   imageUrl: "https://vignette3.wikia.nocookie.net/hhwa/images/2/21/Forage.png/revision/latest?cb=20150324094419"
      // });
      vm.getMessages();
    });
  };
  // var messageLikes = function() {
  //   this.likes = 0;
  // };
  // var likeMessage = function(index) {
  //   console.log('liked in', index);
  //   vm.messageLikes[index].likes++;
  // };


} //end chatController
