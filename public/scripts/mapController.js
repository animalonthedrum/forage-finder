myApp.controller('mapController', mapController);

function mapController(forageService) {
  var vm = this;
  // vm.data = [];
  //   vm.latLngObj = [];
  //   vm.markerObjects = [];
  //
  //   for (var i = 0; i < response.data.length; i++) {
  //     var obj = response.data[i];
  //   }





  vm.showPosition = function() {
    console.log('In show');
    latlon = new google.maps.LatLng(44.9939454, -93.24013529999999);
    console.log(latlon);
    mapholder = document.getElementById('mapholder2');
    // mapholder.style.height = '100vh';
    // mapholder.style.width = '100vh';
    mapholder.style.height = '500px';
    mapholder.style.width = '500px';



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

    var map = new google.maps.Map(document.getElementById("mapholder2"), myOptions);
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

  }; //end showPosition




} //end controller
