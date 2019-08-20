// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const listings = sequelizeClient.define('listings', {
    address: {type: DataTypes.STRING, allowNull: false},
    asking_price: {type: DataTypes.STRING, allowNull: false},
    arv: {type: DataTypes.STRING, allowNull: true},
    repair_cost: {type: DataTypes.STRING, allowNull: true},
    sqr_feet: {type: DataTypes.STRING, allowNull: true},
    comparable_prop: {type: DataTypes.INTEGER, allowNull: true},
    description: {type: DataTypes.STRING, allowNull: false}
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  listings.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    listings.belongsTo(models.user);
    listings.hasMany(models.images);
  };

  return listings;
};
