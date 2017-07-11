myApp.service('forageService', function($http, $location) {
  var sv = this;

  sv.sendRegister = function(credentials) {
    console.log('in service sendRegister');
    // removed temp data
    return $http.post('/register', credentials).then(function(response) {
      console.log('back from register attempt:', response);
    });
  };



  sv.logIn = function(credentials) {
    console.log('in service sendLogIn');
    return $http.post('/login', credentials).then(function(response) {
      console.log('back from login:', response);
      if (response.data) {
        $location.path('/mapIt');
        return response.data;
      }
    });
  }; //end log in

  sv.postMap = function(data) {
    return $http.post('/mapIt', data).then(function(response) {
      console.log('back from /mapIt:', response);
      return response;
    });
  };
  // sv.returnHome = function(credentials) {
  //   return $http.post('/login', credentials).then(function(response) {
  //     console.log('back from login:', response);
  //     if (response.data) {
  //       $location.path('/home');
  //       return response.data;
  //     }
  //   });
  // };



  sv.getItems = function() {
    return $http.get('/mapIt').then(function(response) {
      console.log('get response:', response);
      return response;
    });
  };
  //get messages

  sv.retrieveMessages = function() {
    console.log('in service, retrieveMessages');
    return $http({
      method: 'GET',
      url: '/chat'
    }).then(function(response) {
      console.log('in service back from server with:', response);
      sv.data = response.data;
    }); // end http
  }; //end retrieveMessages

  //post message

  sv.newMessage = function(messageObject) {
    console.log('in service sending:', messageObject);
    return $http({
      method: 'POST',
      url: '/chat',
      data: messageObject
    }).then(function(response) {
      console.log('back from post with:', response);
    }); // end http
  }; // end newMessage

  //delete Message
  sv.deleteMessage = function(messageId) {
    console.log('in deleteMessage, messageId is', messageId);
    return $http({
      method: 'DELETE',
      url: '/chat/' + messageId
    }).then(function(response) {
      sv.deletedMessage = response;
    });
  }; // end deleteMessage


  //delete Marker
  sv.deleteMarker = function(markerId) {
    console.log('in deleteMessage, markerId is', markerId);
    return $http({
      method: 'DELETE',
      url: '/mapIt/' + markerId
    }).then(function(response) {
      sv.deletedMarker = response;
    });
  }; // end deleteMarker

  sv.getCity = function(lat, lon) {
    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=AIzaSyAhz5owgKeTL_sj8oqFW0OESORQB22ygvE'
    }).then(function(response) {
      console.log(response);
      return response;

    });
  };

  // sv.getPlace = function(showCity) {
  //   var lat = showCity.lat2;
  //   var lon = showCity.lon2;
  //   return $http({
  //     method: 'GET',
  //     url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=AIzaSyAhz5owgKeTL_sj8oqFW0OESORQB22ygvE'
  //   }).then(function(response) {
  //     return response;
  //   });
  // };



}); //end service
