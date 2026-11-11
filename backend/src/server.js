require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const config = require('./config/config');

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`KESCA backend running on http://localhost:${PORT}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.warn('Database connection warning (check MariaDB/MySQL service):', err.message);
  });
