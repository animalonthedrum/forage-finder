var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/partials/login.html'
    // }).when('/home', {
    //   templateUrl: 'views/partials/home.html'
  }).when('/mapIt', {
    templateUrl: 'views/partials/mapIt.html'
  }).when('/chat', {
    templateUrl: 'views/partials/chat.html',
    controller: 'chatController as cc'
  }).when('/finds', {
    templateUrl: 'views/partials/finds.html',
    controller: 'mapController as mc'
  });
});



myApp.controller('forageController', forageController);

function forageController(forageService, $location) {
  var vm = this;
  vm.loggedInUser;
  vm.loginToggle = true;
  vm.spinnerToggle = false;
  var latlon;
  vm.loginName;
  vm.maps = [];
  vm.public = 1;
  vm.private = 2;


  // //loading spinner
  // vm.toggleSpinner = function() {
  //   vm.spinnerToggle = !vm.spinnerToggle;
  // }; //end toggleSpinner

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
        // vm.loginName = vm.username;
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
        vm.loginName = vm.username;
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
    $location.path('/mapIt');
    // forageService.returnHome(credentials).then(function(response) {
    //   console.log(response);
    //   vm.loggedInUser = response;
    // });
  }; //end return home

  vm.getLocation = function() {
    if (navigator.geolocation) {
      vm.spinnerToggle = true;
      console.log(vm.spinnerToggle);
      navigator.geolocation.getCurrentPosition(vm.showPosition, vm.showError);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";

    }

  }; //end getLocation

  vm.showPosition = function(position) {
    vm.lat = position.coords.latitude;
    vm.lon = position.coords.longitude;
    vm.time = position.timestamp;
    vm.date = new Date(vm.time).toLocaleString();
    console.log('Lat:', vm.lat, 'lon:', vm.lon, 'time:', vm.time, 'date:', vm.date);
    vm.spinnerToggle = false;
    console.log(vm.spinnerToggle);
    latlon = new google.maps.LatLng(vm.lat, vm.lon);
    console.log(latlon);
    mapholder = document.getElementById('mapholder');
    mapholder.style.height = '100vh';
    mapholder.style.width = '100vh';
    // mapholder.style.height = '500px';
    // mapholder.style.width = '500px';



    var myOptions = {
      center: latlon,
      // zoom: 20,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      navigationControlOptions: {
        style: google.maps.NavigationControlStyle.SMALL
      }
    }; //end myOptions

    vm.contentString = '<div class="mapTitle"><textarea rows="4" cols="40" id="markerTitle" ng-model ="fc.title" class="title"placeholder="Title"></textarea></div>';

    var infowindow = new google.maps.InfoWindow({
      content: vm.contentString
    });

    var image = 'images/mushroom.png';

    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: latlon,
      map: map,
      icon: image,

      // title: "You are here!"
    }); //end marker

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    vm.spinnerToggle = false;
    console.log(vm.spinnerToggle);

  }; //end showPosition

  //make custom marer


  vm.showError = function(error) {
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
  vm.postItem = function() {
    var itemToSend = {
      // description: vm.info,
      placer: vm.loginName,
      lat: vm.lat,
      lon: vm.lon,
      title: document.getElementById('markerTitle').value,
      date: vm.date,
      public: vm.public,
      private: vm.private

    };
    console.log(vm.mode);
    // console.log(itemToSend);
    forageService.postMap(itemToSend).then(function(response) {
      console.log(itemToSend);
    });

  }; //end postItem

  vm.getItems = function() {
    console.log('in controller, getItems');
    forageService.getItems().then(function(res) {
      console.log('in get:', res);
      vm.maps = res.data;


    });
  };
  vm.getItems();





} //end controller
