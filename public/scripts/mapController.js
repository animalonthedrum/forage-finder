myApp.controller = ('mapController', mapController);

function mapController(forageService) {
  var vm = this;


  vm.showPosition = function(position) {
    vm.lat = position.coords.latitude;
    vm.lon = position.coords.longitude;
    vm.time = position.timestamp;
    vm.date = new Date(vm.time).toLocaleString();
    console.log('Lat:', vm.lat, 'lon:', vm.lon, 'time:', vm.time, 'date:', vm.date);
    vm.spinnerToggle = false;
    console.log(vm.spinnerToggle);
    latlon = new google.maps.LatLng(vm.lat, vm.lon);
    mapholder = document.getElementById('mapholder');
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

  }; //end showPosition









} //end controller
