angular.module('app')
  .controller('currentUserController',
    ['$scope', '$location', 'userService', 'authService',
      function($scope, $location, userService, authService){

        // if (authService.isAuthed()){
        //   return $location.path('/main');
        // };

        // $scope.currentUser = " ";
        // console.log($scope.name);

        $scope.currentUser = function(){
          console.log("#1 - inside currentUser function - clientside controller");
          userService.currentUser(function(currentUser){
            console.log("#6: ", currentUser);
            $scope.currentUser = currentUser
          })
        };
        $scope.currentUser();


    }
  ]
);
