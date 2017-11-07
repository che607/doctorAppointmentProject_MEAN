angular.module('app')
  .factory('appointmentFactory', ['$http', function($http){
    const factory = {}
    factory.appointments = [];

    factory.createAppointment = function(newAppointment, callBackToController){
      console.log("appointmentFactory")
      $http.post('/auth/createAppointment', newAppointment)
      .then(function(res){
        console.log("Got appointment.");
        factory.appointments.push(res.data);
        console.log("CHECK 1")
        callBackToController(null, res.data)
      })
      .catch(function(errorResponse){
        console.log(errorResponse);

        callBackToController(errorResponse.data);
      });
    };

    factory.getAppointments = function(callbackToController){
      $http.get('/index')
      .then(function(res){
        factory.appointments = res.data;
        callbackToController(factory.appointments)
      })
      .catch(function(errorResponse){
        console.log(errorResponse);

        callBackToController(errorResponse.data);
      });
    };

    factory.cancel = function(appointment, callBackToController){
      $http.post('/auth/cancel', appointment)
      .then(function(){
        callBackToController()
      })
      .catch(function(errorResponse){
        console.log(errorResponse);

        callBackToController(errorResponse.data);
      });
    };

    return factory
  }])
