// eslint-disable-next-line no-unused-vars
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const db = require('../../db/');

module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  
  app.get('/auth/google', passport.authenticate('google', { scope: ['email profile'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
    // Successful authentication, redirect home.
      res.redirect('/');
    });
  
  //finds all user's properties
  app.get('/properties/:userId', (req, res) => {
    db.Listings.findAll({ where: { userId: req.params.userId } }).
      then((properties)=> { 
        res.send(properties);
      });
  });

  //finds all the images for a user's properties
  app.get('/images/:propId', (req, res)=> {
    db.Images.findAll({ where: { listingId: req.params.propId } }).
      then((images) => {
        res.send(images);
      });
  });

  //finds all the properties for a specific city and zip code
  app.get('/propertiesAll/:zip', (req, res) => {
    let zip = req.params.zip;
    // res.send(`${city}, ${zip}`);
    db.Listings.findAll().
      then((properties) => {
        const allProps = properties.filter((property) => {
          return property.address.split(' ')[property.address.split(' ').length - 1] === zip;
        });
        res.send(allProps);
      });
  });
};

