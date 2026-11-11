const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: { code: 'NO_TOKEN', message: 'Authentication required.' } });
  }
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await User.findByPk(payload.userId);
    if (!user) return res.status(401).json({ error: { code: 'USER_NOT_FOUND', message: 'User not found.' } });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: { code: 'INVALID_TOKEN', message: 'Token is invalid or expired.' } });
  }
};
