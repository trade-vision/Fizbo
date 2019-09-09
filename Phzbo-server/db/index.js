require('dotenv').config();
const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize('postgres', 'phzbo', 'phzbodevteam', {
  host: 'aa6az037e6f2ob.cuemvm7aklsa.us-east-1.rds.amazonaws.com',
  dialect: 'postgres',
});

const models = [
  'User',
  'Listings'
// 'Image'
];

models.forEach((model) => {
  db[model] = sequelize.import(`${__dirname}/models/${model}`);
});

models.forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

sequelize.sync();