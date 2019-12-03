module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    phone_number: { type: DataTypes.STRING, unique: false, allowNull: false },
    profile_pic: { type: DataTypes.STRING, unique: false, allowNull: false },
    company: { type: DataTypes.STRING, unique: false },
    location: { type: DataTypes.STRING, unique: false, allowNull: true },
    password: { type: DataTypes.STRING, unique: false, allowNull: true },
  });

  User.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    User.hasMany(models.Listings);
    User.hasMany(models.Likes);
  };

  return User;
};