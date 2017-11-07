angular.module('app')
  .controller('navController', [ '$scope', '$location', '$route', 'authService',
  function($scope, $location, $route, authService){
    $scope.isAuthed = authService.isAuthed();

    $scope.logout = function(){
      console.log('logging out');
      authService.logout()
        .then(function(){
          console.log('reloading');
          $location.path('/')
        })
        .catch(function(errorResponse){
          // error handle
          console.log('got an error logging out')
        });
    }
  }])
