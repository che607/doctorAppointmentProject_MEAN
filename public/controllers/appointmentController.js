angular.module('app')
  .controller('appointmentController',
  [ '$scope', '$location', '$route', 'appointmentFactory', 'authService', 'userService',
  function($scope, $location, $route, appointmentFactory, authService, userService){
    $scope.isAuthed = authService.isAuthed();

    $scope.appointments = [];
    // $scope.errors = [];

    $scope.createAppointment = function(newAppointment){
      console.log("appointment name: ",newAppointment);

      appointmentFactory.createAppointment(newAppointment, function(errorsArray, appointment){
        if (errorsArray){
          return displayErrors(errorsArray);
        }
        $location.path('/main');
      });
    };

    $scope.getAppointments = function(){
      appointmentFactory.getAppointments(function(appointments){
        $scope.appointments = appointments;
      });
    };
    $scope.getAppointments();

    $scope.cancel = function(appointment){
      console.log("cancel #1")
      appointmentFactory.cancel(appointment, function(){
        console.log("MADE THE CALLBACK 2");
        $scope.getAppointments();
      });
    };

    $scope.currentUser = function(){
      console.log("#1 - inside currentUser function - clientside controller");
      userService.currentUser(function(currentUser){
        console.log("#6: ", currentUser);
        $scope.currentUser = currentUser
      })
    };
    $scope.currentUser();

    function displayErrors(errorArrayOrString){
      $scope.errors = Array.isArray(errorArrayOrString) ? errorArrayOrString : [errorArrayOrString];
    };

  }]);
