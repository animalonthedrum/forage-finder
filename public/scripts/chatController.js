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
    if (!vm.hasName) {
      vm.hasName = true;
    }

    if (vm.body == '') {
      alert('Please enter a message!');
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





} //end chatController
