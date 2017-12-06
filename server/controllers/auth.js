const User = require('mongoose').model('User');
const Appointment = require('mongoose').model('Appointment');

module.exports = {
  index(request,response) {
    Appointment.find({}, function(error,appointments){
      if(error){
        return console.log("error: ",error)
      }
      // console.log("appointments: ", appointments)
      response.json(appointments);
    })
  },
  login(request, response) {
      console.log('inside serverside controller - auth.js');
      User.findOne({ name: request.body.name })
      .then(function(user){
        if (!user) throw new Error('No credentials match');
        console.log("user: ", user)
        login(request, response, user)
      })
      .catch(errorHandler.bind(response));
    },
  register(request, response) {
      User.create(request.body)
        .then(function(user){
          login(request, response, user)
        })
        .catch(errorHandler.bind(response));
  },
  createAppointment(request,response) {
    console.log("inside serverside auth.js controller.");
    console.log("request.body.date as string: ", request.body.date);
    console.log("constructor test: ", request.body.date instanceof Date);
    console.log(typeof(request.body.date));
    // change request.body.date from string to object
    request.body.date = new Date(request.body.date)
    console.log("constructor test: ", request.body.date instanceof Date);
    console.log(typeof(request.body.date));
    console.log("request.body.date as object: ", request.body.date);
    request.body.user = request.session.user.name

    Appointment.find({ date: request.body.date})
      .then(function(dates){
        console.log("dates: ", dates);
        console.log("appointment: ", request.body)
        if(dates.length < 3){
          console.log("date logic");
          Appointment.create(request.body)
            .then(function(appointment){
              response.json(appointment)
            })
            .catch(errorHandler.bind(response));
        }
      })
      .catch();
  },
  logout(request, response) {
    console.log('serverside - auth.js logout');
    request.session.destroy();
    response.clearCookie('userID');
    response.clearCookie('expiration');
    response.json(true);
  },
  cancel(request, response){
    Appointment.remove({ complain:  request.body.complain })
      .then(function(){
        console.log("appointment deleted");
        response.json("Appointment Deleted")
      })
      .catch(errorHandler.bind(response));
  },
  currentUser(request, response){
    console.log("#3 - server controller - request.session.user: ", request.session.user.name);
    response.json(request.session.user.name);
  }
};

function login(request, response, user){
  console.log("loginFunc - request.session.user: ", request.session.user);
  request.session.user = user.toObject();
  console.log("request.session.user(update): ", request.session.user);
  delete request.session.user.password;

  response.cookie('userID', user._id);
  response.cookie('expiration', Date.now() * 86400 * 1000);

  response.json(true);
}

function errorHandler(error){
  let errors = [];

  if (error.errors){
    errors = Object.keys(error.errors).map(key => error.errors[key].message);
  }
  else if(typeof error === 'string'){
    errors.push(error)
  }
  else{
    errors.push(error.message);
  }

  console.log(errors);

  this.status(422).json(errors);
}
