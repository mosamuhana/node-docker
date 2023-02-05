const { connect, set } = require('mongoose');

const { MONGO_HOST, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, MONGO_DB } = require('../config');

async function _connect() {
  set('strictQuery', false);

  let db;
  try {
    db = await connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}`, {
      dbName: MONGO_DB,
      user: MONGO_USER,
      pass: MONGO_PASSWORD,
      autoCreate: true,
      authSource: 'admin',
      directConnection: true,
      serverSelectionTimeoutMS: 2000,
      appName: 'mongosh+1.6.2',
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.log(error);
  }

  return db;
}

module.exports = _connect;
