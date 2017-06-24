var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/partials/login.html'
  }).when('/home', {
    templateUrl: 'views/partials/home.html'
  }).when('/mapIt', {
    templateUrl: 'views/partials/mapIt.html'
  }).when('/chat', {
    templateUrl: 'views/partials/chat.html'
  });
});

myApp.controller('forageController', forageController);

function forageController(forageService, $location) {
  var vm = this;
  vm.loggedInUser;
  vm.loginToggle = true;

  vm.toggleLogin = function() {
    vm.loginToggle = !vm.loginToggle;
  };

  vm.register = function() {
    console.log('in controller register');
    // assemble credentialsObject
    var credentials = {
      username: vm.username,
      password: vm.password
    };
    if (vm.username === undefined || vm.password === undefined) {
      sweetAlert("UH OH...", "Invalid Username/Password!", "error");
    } else {
      forageService.sendRegister(credentials).then(function() {
        swal({
          title: "Great Find!",
          text: "Log In to Start Mapping Your Forage Finds!",
          imageUrl: "https://vignette3.wikia.nocookie.net/hhwa/images/2/21/Forage.png/revision/latest?cb=20150324094419"
        });
        // clear out inputs
        vm.username = "";
        vm.password = "";
      });
    }
  };

  vm.logIn = function() {
    console.log('in controller logIn');
    var credentials = {
      username: vm.username,
      password: vm.password
    };
    if (vm.username === undefined || vm.password === undefined) {
      sweetAlert("Invalid username/password!", "Have You Registered?", "error");
    } //end if
    else {
      forageService.logIn(credentials).then(function(response) {
        console.log(response);
        vm.loggedInUser = response;

        vm.username = "";
        vm.password = "";

      });
    }
  };

  vm.logOut = function() {
    console.log('logging out', vm.loggedInUser);
    vm.loggedInUser = '';
    $location.path('/');
  };

  vm.returnHome = function() {
    console.log('returning home');
    $location.path('/home');
    // forageService.returnHome(credentials).then(function(response) {
    //   console.log(response);
    //   vm.loggedInUser = response;
    // });
  };

  // vm.mapIt = function() {
  //   var itemToSend = {
  //     item: vm.item
  //   };
  //   forageService.mapIt(itemToSend).then(function(res) {
  //     console.log(res);
  //   });
  // };

  // vm.getShelves = function() {
  // 	console.log('in controller, getShelvs');
  // 	shelfService.retrieveMessages().then(function() {
  // 		vm.shelfObject = shelfService.data;
  // 		console.log('back in controller with:', vm.shelfObject);
  // 	});
  // }; //end


  //
  // 	if (vm.body == '') {
  // 		alert('do NOT spam us with your empty messages!!!');
  // 	} // end empty message
  // 	else {
  // 		// create object to send
  // 		var newMessage = {
  // 			name: vm.name,
  // 			body: vm.body
  // 		}; // end newMessage
  // 		console.log('in controller sending:', newMessage);
  // 		shelfService.newMessage(newMessage).then(function() {
  // 			console.log('back in controller after post');
  // 			vm.getMessages();
  // 			vm.body = '';
  // 		});
  // 	} // end message exxists
  // };

} //end controller
