const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const mapModel = ({ _id, username, password }) => ({ id: _id, username });

const SECRET = 10;

async function signUp(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.create({
      username,
      password: await bcrypt.hash(password, SECRET),
    });

    req.session.user = mapModel(user);

    return res.status(200).json({
      status: 'success',
      data: { userId: user._id },
    });
  } catch (error) {
    console.log('auth.signUp', error);
  }

  res.status(400).json({
    status: 'failed',
    message: 'signUp failed',
  });
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user != null) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        req.session.user = mapModel(user);
        return res.status(200).json({
          status: 'success',
          data: { userId: user._id },
        });
      }
    }
  } catch (error) {
    console.log('auth.login', error);
  }

  res.status(401).json({
    status: 'failed',
    message: 'Invalid username/password',
  });
}

module.exports = { signUp, login, };
