const Sequelize = require('sequelize');
require('dotenv').config();

module.exports = function (app) {
  // const connectionString = app.get('postgres');

  const sequelize = new Sequelize('postgres', 'phzbo', 'phzbodevteam', {
    host: 'aa6az037e6f2ob.cuemvm7aklsa.us-east-1.rds.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: 'Amazon RDS'
    },
  });

  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelize.sync();

    return result;
  };
};
