angular.module('app')
  .service('userService', ['$http', function($http){

    this.login = function(user, callBackToController){
      return $http.post('/auth/login', user);
      // .then(function(){
      //   console.log("inside service-login-.then")
      // })
      // .catch(function(errorResponse){
      //   console.log('inside service-login-.catch')
      //   callBackToController(errorResponse.data)
      // })
    };

    this.register = function(user){
      return $http.post('/auth/register', user);
    };

    this.currentUser = function(callBackToController){
      console.log("#2 - inside currentUser function - userService");
      $http.get('/auth/currentUser')
        .then(function(response){
          console.log("#4: ", response.data);
          this.currentUser = response.data;
          console.log("#5: ", this.currentUser);
          callBackToController(this.currentUser)
        })
        .catch(function(errorResponse){
          console.log(errorResponse);

          callBackToController(errorResponse.data);
        });
    };

  }]);
