const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const app = require('./app')
const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const oauth2 = require('@feathersjs/authentication-oauth2');
const { Strategy } = require('passport-google-oauth2');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport = require('passport');

// app.use(passport.initialize());

// passport.use(new GoogleStrategy({
//     clientID: "770950766923-7nsbhe8d5qvkvlthbkgg201nbe9tbns6.apps.googleusercontent.com",
//     clientSecret: "Qt48gJNcWk9HhaynF476CEuo",
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));




// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


