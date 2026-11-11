require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mariadb',
    logging: false,
    dialectOptions: { timezone: '+00:00' },
  }
);

module.exports = sequelize;

// Also export sequelize-cli config (used by .sequelizerc)
module.exports.development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306'),
  dialect: 'mariadb',
  dialectOptions: { timezone: '+00:00' },
};
module.exports.production = module.exports.development;
module.exports.test = module.exports.development;
