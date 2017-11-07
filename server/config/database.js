const mongoose = require( 'mongoose' );
const path = require( 'path' );
const fs = require( 'fs' )
// here we are calling the file system module
const modelsDir = path.resolve( 'server', 'models' )
const reg = new RegExp( '.js$', 'i' )
// the above line means it wont look for any files like blah.js.whatever in our project, only .js files
// and 'i' means being case insensitive about it

mongoose.connect( 'mongodb://localhost/beltExamTryOne' );
mongoose.connection.on( 'connected', () => console.log( 'Connected to mongoDB' ));
mongoose.Promise = global.Promise;

fs.readdirSync(modelsDir).forEach(function(file){
  if (reg.test(file)) {
    require(path.join(modelsDir, file));
  }
});
