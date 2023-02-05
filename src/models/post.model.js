const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    require: [true, 'Post must have title'],
  },
  body: {
    type: String,
    require: [true, 'Post must have body'],
  },
});

module.exports = model('Post', schema);
