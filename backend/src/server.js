require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const config = require('./config/config');

const PORT = config.port;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
    app.listen(PORT, () => console.log(`KESCA backend running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });
