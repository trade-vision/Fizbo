// eslint-disable-next-line no-unused-vars
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const db = require('../../db/');
const stripe = require('stripe')('sk_test_tTbx7glLXWfiF9ZIqPzuq9Se006dSsEACD');


module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  

  // ------------------ Google Auth ------------------------
  
  app.get('/auth/google', passport.authenticate('google', { scope: ['email profile'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
    // Successful authentication, redirect home.
      res.redirect('/');
    });
  
  //-------------------------------------------------------------




  // --------------------- Users -----------

  app.get('/user/:propId', async (req, res)=> {
    let listing = await db.Listings.findOne({ where: { id: req.params.propId } });
    let user = await db.User.findOne({ where: { id: listing.userId } });
    res.send(user);
  });

  app.put('/editProfile', async (req, res) => {
    let myProfile = await db.User.findOne({ where: { id: req.session.passport.user.id } });
    // myProfile.update(req.body.newEdits);
  });

  // --------------------- Properties -----------
  //finds all user's properties
  app.get('/properties/:userId', async (req, res) => {
    let properties = await db.Listings.findAll({ where: { userId: req.params.userId } });
    res.send(properties);
  });

  //finds all the properties for a specific city and zip code
  app.get('/propertiesAll/:zip', (req, res) => {
    let zip = req.params.zip;
    // res.send(`${city}, ${zip}`);
    db.Listings.findAll().
      then( async (properties) => {
        const allProps = properties.filter((property) => {
          return property.address.split(' ')[property.address.split(' ').length - 1] === zip;
        });

       
       
        res.send(allProps);
      });

  });
  //-------------------------------------------------


  // ------------------ Images ------------------
  //finds all the images for a user's properties
  app.get('/images/:propId', (req, res)=> {
    db.Images.findAll({ where: { listingId: req.params.propId } }).
      then((images) => {
        res.send(images);
      });
  });
  //-------------------------------------------------------------
  

  //------------------ Likes ----------------------------------


  app.get('/likes', (req, res) => {
    db.Likes.findAll({
      where: {
        userId: req.session.passport.user.id
      }
    }).then((likes) => {
      res.send(likes);
    }).catch((err) => {
      console.error(err);
    })

  });

  app.post('/like/:propId', (req, res) => {
    db.Likes.create({
      userId: req.session.passport.user.id,
      listingId: req.params.propId
    }).then((like) => {
      res.send(like);
    })
      .catch((err) => {
        console.error(err);
      });
  });

  app.put('/unlike/:propId', (req, res) => {
    db.Likes.destroy({ 
      where: { listingId: req.params.propId, 
        userId: req.session.passport.user.id} })
      .then((like) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
      });
  });


  //-----------------------------------------------

  // ------------- Payment ---------------

  //Create Customer 
  app.post('/createCustomer', (req, res)=> {
    console.log(req.body);
    stripe.customers.create({
      description: 'Customer for ejeric2@example.com',
      source: 'visa' // obtained with Stripe.js
    }, function(err, customer) {
      // asynchronously called
      res.send(customer);
    });
  });

  //Create Charge 
  app.post('/createCharge', (req, res) => {
    // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/cards/collecting/web#create-token
    stripe.charges.create(
      req.body.token, 
      function(err, charge) {
        // asynchronously called
        res.send(charge);
      });
  });

  //CreatePaymentMethod 
  app.post('/paymentmethod', (req, res) => {

    stripe.paymentMethods.create(req.body.token, function(err, token) {
      // asynchronously called
      if(err){
        console.log(err);
      }
      res.send(token);
    });
  });

  //attach customer to payment method 
  app.post('/attach', (req, res) => {

    stripe.paymentMethods.attach('pm_card_visa', {customer: 'cus_G10GOloYeaDWbx'}, function(err, paymentMethod) {
      // asynchronously called
      res.send(paymentMethod);
    });
  });




    

     
   
  //-------------------------------------------------------------

};
