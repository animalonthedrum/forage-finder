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
  }).when('/finds', {
    templateUrl: 'views/partials/finds.html'
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
  }; //end return home

  vm.getLocation = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }; //end getLocation

  function showPosition(position) {
    vm.lat = position.coords.latitude;
    vm.lon = position.coords.longitude;
    console.log('Lat:', vm.lat, 'lon:', vm.lon);
    latlon = new google.maps.LatLng(vm.lat, vm.lon);
    mapholder = document.getElementById('mapholder');
    mapholder.style.height = '500px';
    mapholder.style.width = '500px';


    var myOptions = {
      center: latlon,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      navigationControlOptions: {
        style: google.maps.NavigationControlStyle.SMALL
      }
    }; //end myOptions

    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    var marker = new google.maps.Marker({
      position: latlon,
      map: map,
      title: "You are here!"
    }); //end marker
  } //end showPosition

  //make custom marer


  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred.";
        break;
    } //end switch
  } //end showError

  vm.spinner = function() {
    var wheel = true;
  };




} //end controller
