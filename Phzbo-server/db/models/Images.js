
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

  // eslint-disable-next-line no-unused-vars

  return Images;
};