const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Token = require('../models/token.js');

const validDuration = 60 * 60 * 30; // 30 mins; 108,000 seconds

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      console.log('no token is attached');
      throw new Error('missing token');
    }

    const { id, exp, iat } = jwt.verify(token, process.env.JWT_SECRET);

    // check if token expires from db
    const storedToken = await Token.findOne({ where: { token } });
    if (!storedToken || !storedToken.active) {
      console.log('token is expired by checking token in database');
      throw new Error('token expired');
    }

    // check if token expires from jwt
    const now = Math.floor(Date.now() / 1000);
    if (iat >= exp || now - exp > validDuration) {
      await Token.update({ active: false }, { where: { id: storedToken.id } });
      console.log('token is expired by checking jwt');
      throw new Error('token expired');
    }

    // check if user exists
    console.log('user id to check');
    console.log(id);
    const user = await User.findOne({ where: { id } });
    if (!user) {
      console.log('user does not exist');
      throw new Error('invalid token');
    }

    // append current token of the device
    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    res.clearCookie('token').status(403).send({
      resCode: 403,
      error: 'Please authenticate',
      errorMessage: error.message,
    });
  }
};

module.exports = auth;
