const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const logger = require('../../util/logger');

const User = require('../../models/User');

/**
 * @route       GET api/auth
 * @description Test route
 * @access      Public
 */
router.get('/', auth, async (req, res) => {
  logger.http('Service called', { service: 'GET api/auth' });
  try {
    const user = await await User.findById(req.user.id).select('-password');

    logger.info('Request successful', { service: 'GET api/auth' });
    res.json(user);
  } catch (err) {
    logger.error(err.message, { service: 'GET api/auth' });
    res.status(500).send('Server error');
  }
});

/**
 * @route       POST api/auth
 * @description Authenticate user & get token
 * @access      Public
 */
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password').exists(),
  ],
  async (req, res) => {
    logger.http('Service called', { service: 'POST api/auth' });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      logger.error('Validation error', { service: 'POST api/auth' });
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // See if user exists
      if (!user) {
        logger.error('Invalid credentials', { service: 'POST api/auth' });
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        logger.error('Invalid credentials', { service: 'POST api/auth' });
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Return jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            logger.error(err, { service: 'POST api/auth' });
            throw err;
          }
          logger.info('Request successful', { service: 'POST api/auth' });
          res.json({ token });
        }
      );

      // res.send('User registered');
    } catch (err) {
      logger.error(err.message, { service: 'POST api/auth' });
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
