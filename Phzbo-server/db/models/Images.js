
module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('images', {
    url: { type: DataTypes.STRING, allowNull: true }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  Images.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    Images.belongsTo(models.Listings);
  };

  return Images;
};