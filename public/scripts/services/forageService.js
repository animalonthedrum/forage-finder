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
  };


  // sv.addItem = function(item) {
  // 	console.log('item:', item);
  // 	return $http.post('/shelf', item).then(function(response) {
  // 		console.log('back from add:', response);
  // 		return response;
  // 	});
  // };



});
