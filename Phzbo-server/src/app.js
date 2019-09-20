const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
require('dotenv').config();
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const session = require('express-session');
const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const profile = require('./profileRoutes.js');
const sequelize = require('./sequelize');
const db = require('../db/');
const app = express(feathers());
const models = sequelize.models;
// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/profile', profile);
// app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
// app.use('/', express.static(path.join('public')));
app.use('/', express.static(path.join(__dirname, '../../build'))); //  "public" off of current is root
//  "public" off of current is root

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: '770950766923-7nsbhe8d5qvkvlthbkgg201nbe9tbns6.apps.googleusercontent.com',
  clientSecret: 'Qt48gJNcWk9HhaynF476CEuo',
  callbackURL: 'http://localhost:8080/auth/google/callback'
},
function(accessToken, refreshToken, profile, cb) {
  // app.services.user.find({ email: profile.emails[0].value })
  // User.find({ where: { email: profile.emails[0].value } })
  db.User.findOne({ where: { email: profile.emails[0].value } })
  .then((user)=> {
    if(user){
      return cb(null, user);
    } else {
      db.User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        phone_number: "",
        profile_pic: profile.photos[0].value,
        company: "",
        location: "",
        password: ""
      }).then((newUser)=> {
        return cb(null, newUser);
      }).catch((err) => {
        console.log(err);
      })
    }
    }).catch((err)=> {
      console.log(err);
    });
}
));




module.exports = app;
