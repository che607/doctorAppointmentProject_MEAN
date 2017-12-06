const authController = require( '../controllers/auth.js' )

module.exports = function(app) {
  console.log("INSIDE ROUTES");
  app.get('/index', authController.index)
    .post('/auth/login', authController.login)
    .post('/auth/register', authController.register)
    .post('/auth/createAppointment', authController.createAppointment)
    .get('/auth/currentUser', authController.currentUser)
    .post('/auth/cancel', authController.cancel)
    .delete('/auth/logout', authController.logout);
};
