const express = require( 'express' );
const path = require( 'path' );
const parser = require('body-parser');
const session = require( 'express-session' );
const mongoose = require( 'mongoose' );
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;
const app = express();

var sessionStore = new MongoStore({
      port: port,
      url: 'mongodb://localhost/LogRegDB'
  });

const sessionConfig = {
  secret: "SessionSecret",
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  name: 'currentUser',
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 3600000
  }
};

app.use( express.static( path.resolve( 'public' )));
app.use( express.static( path.resolve( 'bower_components' )));
app.use(session(sessionConfig));
app.use(cookieParser('SessionSecret'));
app.use( parser.json() );
app.use( parser.urlencoded({ extended: true }));

require( path.resolve( 'server', 'config', 'database' ));
require( path.resolve( 'server', 'config', 'routes' ))(app);

app.listen( port, () => console.log( `server running on port ${ port }` ));
