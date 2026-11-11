// App configuration — reads environment variables only, no defaults for secrets
module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: '7d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
