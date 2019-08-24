// eslint-disable-next-line no-unused-vars
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  
  app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

 
};
