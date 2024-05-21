const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bd_wooting', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

module.exports = sequelize;
