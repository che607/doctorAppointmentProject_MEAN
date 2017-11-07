angular.module('app')
  .controller('mainController',
    ['$scope', '$location', 'userService', 'authService',
      function($scope, $location, userService, authService){

        if (authService.isAuthed()){
          return $location.path('/main');
        };

        $scope.login = function(){
          console.log('inside mainController')
          userService.login($scope.user, function(errorResponse){
            if (errorsArray){
              return displayErrors(errorsArray);
            }
          })
            .then(function(){
              $location.path('/main');
            })
            .catch(function(errorResponse){
              console.log(errorResponse);
            });
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
          $scope.errors = Array.isArray(errorArrayOrString) ? errorArrayOrString : [errorArrayOrString];
        };

      }
    ]
  );
