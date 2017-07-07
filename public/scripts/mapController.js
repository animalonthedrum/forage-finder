myApp.controller('mapController', mapController);

function mapController(forageService) {
  var vm = this;
  var image = 'images/mushroom.png';
  var infowindow;
  var map;
  vm.showPosition = function() {
    console.log('In show');
    latlon = new google.maps.LatLng(44.9939454, -93.24013529999999);
    mapholder = document.getElementById('mapholder2');
    mapholder2.style.height = '500px';
    mapholder2.style.width = '500px';

    var myOptions = {
      center: latlon,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      navigationControlOptions: {
        style: google.maps.NavigationControlStyle.SMALL
      }
    }; //end myOptions
    map = new google.maps.Map(document.getElementById("mapholder2"), myOptions);

    infowindow = new google.maps.InfoWindow({

    });

  }; //end showPosition


  vm.getItems = function() {
    console.log('in controller, getItems');
    forageService.getItems().then(function(res) {
      console.log('in get:', res);
      vm.showPosition();
      for (var i = 0; i < res.data.length; i++) {
        createMarker(res.data[i]);
      }
      console.log(res.data);

    }); //ends .then


  }; //end getItems


  function createMarker(place) {
    var marker, i;

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(place.lat, place.lon),
      icon: image,
      title: place.title,
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function() {

      infowindow.setContent('<h2>Description: ' + place.title + '</h2>' + 'Date (Y/M/D): ' + place.timeStamp.slice(0, 10));
      infowindow.open(map, this);
    }));
  }



} //end controller