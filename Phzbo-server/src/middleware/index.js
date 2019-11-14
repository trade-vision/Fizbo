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

       
       
        return allProps;
      }).then(async (props)=> {
        let user = props.map(async (prop) => {
          let user = await db.User.findOne({ where: { id: prop.userId } });
          return user;
        });
        // let user = await db.User.findOne({ where: { id: [...props].userId } });
        Promise.all(user)
          .then((users)=> {
            props.map((prop)=> {
              users.map((selectUser)=> {
                if (prop.userId === selectUser.id){
                  prop.user = selectUser;
                }
              });
            });
            res.send(props);
          });
        
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
  

// ------------- Payment ---------------

    //Create Customer 
    app.post('/createCustomer', (req, res)=> {
      console.log(req.body);
      stripe.customers.create({
        description: 'Customer for ejeric2@example.com',
        source: "visa" // obtained with Stripe.js
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
    })

    //CreatePaymentMethod 
    app.post('/paymentmethod', (req, res) => {

        stripe.paymentMethods.create(req.body.token, function(err, token) {
          // asynchronously called
          if(err){
            console.log(err);
          }
          res.send(token);
        });
    })

    //attach customer to payment method 
    app.post('/attach', (req, res) => {

      stripe.paymentMethods.attach('pm_card_visa', {customer: 'cus_G10GOloYeaDWbx'}, function(err, paymentMethod) {
        // asynchronously called
        res.send(paymentMethod);
      });
  })




    

     
   
 //-------------------------------------------------------------
};

