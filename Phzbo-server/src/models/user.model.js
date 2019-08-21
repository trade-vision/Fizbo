// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const user = sequelizeClient.define('user', {
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    phone_number: { type: DataTypes.STRING, unique: false, allowNull: false },
    profile_pic: { type: DataTypes.STRING, unique: false, allowNull: false },
    company: { type: DataTypes.STRING, unique: false },
    location: { type: DataTypes.STRING, unique: false, allowNull: true },
    password: { type: DataTypes.STRING, unique: false, allowNull: true },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  user.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    user.hasMany(models.listings)
  };

  return user;
};
