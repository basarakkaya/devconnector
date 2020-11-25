const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

/**
 * @description Creates DB Connection with given credentials & configs
 */
const connectDB = async () => {
  try {
    console.log('Waiting for MongoDB Connection...');

    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
