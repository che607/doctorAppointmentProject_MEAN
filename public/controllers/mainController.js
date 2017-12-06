angular.module('app')
  .controller('mainController',
    ['$scope', '$location', 'userService', 'authService',
      function($scope, $location, userService, authService){

        if (authService.isAuthed()){
          return $location.path('/main');
        };

        $scope.login = function(){
          console.log('Inside client side userService.login function');
          userService.login($scope.user, function(errorResponse){
            console.log("in here 1", errorResponse);
            if (errorResponse){
              return displayErrors(errorResponse);
            }
            console.log("did not return out");
            $location.path('/');
          });
            // .then(function(){
            //   console.log("in here 2");
            //
            //     // $location.path('/main');
            //
            // })
            // .catch(function(errorResponse){
            //   console.log("in here 3");
            // });
        };

        $scope.register = function(callback){
          userService.register($scope.user)
            .then(function(){
              $location.path('/main');
            })
            .catch(function(errorResponse){
              console.log(errorResponse);
              callback(errorResponse.data.errors);
            });
        };

        function displayErrors(errorArrayOrString){
          console.log("in error function");
          $scope.errors = Array.isArray(errorArrayOrString) ? errorArrayOrString : [errorArrayOrString];
          console.log("errors: ", $scope.errors);
        };

      }
    ]
  );
