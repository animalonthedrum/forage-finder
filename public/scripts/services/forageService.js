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


}); //end service
