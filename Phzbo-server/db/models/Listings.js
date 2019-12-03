// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
module.exports = (sequelize, DataTypes) => {
  const Listings = sequelize.define('listings', {
    address: { type: DataTypes.STRING, allowNull: false },
    asking_price: { type: DataTypes.STRING, allowNull: false },
    arv: { type: DataTypes.STRING, allowNull: true },
    repair_cost: { type: DataTypes.STRING, allowNull: true },
    sqr_feet: { type: DataTypes.STRING, allowNull: true },
    comparable_prop: { type: DataTypes.INTEGER, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: false }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  
  Listings.associate = (models) => {
    Listings.belongsTo(models.User);
    Listings.hasMany(models.Images);
    Listings.hasMany(models.Likes);
  };
  return Listings;
};
