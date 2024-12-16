const { Sequelize } = require('sequelize');
const config = require('./database').mariadb;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize; 