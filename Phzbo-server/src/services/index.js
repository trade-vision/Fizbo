const user = require('./user/user.service.js');
const listings = require('./listings/listings.service.js');
const images = require('./images/images.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(user);
  app.configure(listings);
  app.configure(images);
};
