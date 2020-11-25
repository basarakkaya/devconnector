const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const logger = require('../util/logger');

/**
 * @description Creates DB Connection with given credentials & configs
 */
const connectDB = async () => {
  try {
    logger.info('Waiting for MongoDB Connection...');

    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });

    logger.info('MongoDB Connected...');
  } catch (err) {
    logger.error(err.message);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
