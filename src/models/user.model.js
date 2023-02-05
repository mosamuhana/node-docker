const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: {
    type: String,
    require: [true, 'User must have username'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'User must have password'],
  },
});

module.exports = model('User', schema);
