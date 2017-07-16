myApp.controller('mapController', mapController);
var controllerHolder;

function mapController(forageService, $filter) {
  var vm = this;
  vm.spinnerToggle = true;
  controllerHolder = this;
  var image = 'images/mushroom2.png';
  var infowindow;
  var map;


  vm.showPosition = function(lat, lng) {
    console.log('In show');

    latlon = new google.maps.LatLng(lat, lng);
    mapholder = document.getElementById('mapholder');
    // mapholder.style.height = '500px';
    // mapholder.style.width = '500px';
    mapholder.style.height = '90vh';
    mapholder.style.width = '100vw';

    var myOptions = {
      center: latlon,
      zoom: 16,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        mapTypeIds: ['roadmap', 'terrain', 'hybrid']
      },
      scrollwheel: false,
      navigationControlOptions: {
        style: google.maps.NavigationControlStyle.SMALL
      },
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      fullscreenControl: true,
      streetViewControl: false
    }; //end myOptions
    map = new google.maps.Map(document.getElementById("mapholder"), myOptions);

    infowindow = new google.maps.InfoWindow({

    });
  }; //end showPosition


  vm.getItems = function() {
    console.log('in controller, getItems');
    forageService.getItems().then(function(res) {
      console.log('in get:', res);
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat1 = position.coords.latitude;
        var lng1 = position.coords.longitude;
        vm.showPosition(lat1, lng1);
        for (var i = 0; i < res.data.length; i++) {
          createMarker(res.data[i]);
        }

      });
      // });
    }); //ends .then


  }; //end getItems

  function createMarker(place) {
    var marker, i;

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(place.lat, place.lon),
      animation: google.maps.Animation.BOUNCE,
      icon: image,
      title: place.title,
      map: map
    });
    marker.setAnimation(4);

    google.maps.event.addListener(marker, 'click', (function() {
      console.log(place._id);
      infowindow.setContent('<div class="markerBox">' + '<h3 class="markerInfo">' + place.title + '</h3>' + '<img src=' + place.img + ' class="markerImg">' + '<h5 class="markerInfo">Date (Y/M/D): ' + place.timeStamp.slice(0, 10) + '</h5>' + '<button class="deleteMarkBtn" onclick="deletePlace(\'' + place._id + '\')" type="button">Delete</button>' + '</div>');
      // '<button class="deleteMarkBtn" onclick="deletePlace(\'' + place._id + '\')" type="button">Delete</button>'

      //  ' Share: ' + place.options +
      infowindow.open(map, this);
    }));
  }

  //delete Marker

  vm.deleteMarker = function(index) {
    console.log('message to delete:', index);
    forageService.deleteMarker(index).then(function() {
      console.log('back in controller', forageService.deletedMarker);
      vm.deletePoint = forageService.deletedMessage;
      // vm.getItems();
    });

  };


} //end controller

function deletePlace(id) {
  console.log('im out of the controller zikka zikka', id);
  controllerHolder.deleteMarker(id);

}
