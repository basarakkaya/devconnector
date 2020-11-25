const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../util/logger');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    logger.warn('No token, authorization denied', { middleware: 'auth' });
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    logger.error('Token is not valid', { middleware: 'auth' });
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
