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
        $location.path('/home');
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

  // sv.mapIt = function(item) {
  //   console.log('item:', item);
  //   return $http.post('/mapIt', item).then(function(response) {
  //     console.log('back from add:', response);
  //     return response;
  //   });
  // };

  sv.getItems = function() {
    return $http.get('/finds').then(function(response) {
      console.log('get response:', response);
      return response;
    });
  };



}); //end service
