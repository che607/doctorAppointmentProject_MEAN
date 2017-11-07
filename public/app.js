angular.module('app', ['ngRoute', 'ngCookies'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'partials/_index.html',
      controller: 'mainController',
    })
    .when('/main', {
      templateUrl: 'partials/_main.html',
    })
    .when('/makeappointment', {
      templateUrl: 'partials/_makeappointment.html',
      // controller: 'appointmentController',
    })
    .otherwise({
      redirectTo: '/'
    });
  }]);
