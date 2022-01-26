const express = require('express');
const router = new express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Token = require('../models/token.js');
const JWT_SECRET = process.env.JWT_SECRET;
const { cookieSetting, jwtSetting } = require('../assets/tokenSetting.js');
const auth = require('../middleware/auth.js');

// check if token is valid
router.get('/', auth, async (req, res) => {
  let status = 200;
  let message = 'success';

  const { id, email, name } = req.user;

  res.status(status).json({ status, message, data: { id, email, name } });
});

router.post('/login', async (req, res) => {
  let status = 200;
  let message = 'success';

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      status = 400;
      throw new Error('invalid email or password');
    }

    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      status = 400;
      throw new Error('invalid email or password');
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      status = 400;
      throw new Error('invalid email or password');
    }

    const storedTokens = await Token.findAll({
      where: { user_id: user.id, active: true },
    });
    if (storedTokens.length) {
      const tokenIds = storedTokens.map((token) => token.id);
      for (const tokenId of tokenIds) {
        await Token.update({ active: false }, { where: { id: tokenId } });
      }
    }

    const token = jwt.sign(
      {
        ...jwtSetting,
        id: user.id,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET
    );

    await Token.create({ user_id: user.id, token, active: true });

    res
      .cookie('token', token, cookieSetting)
      .status(status)
      .json({ status, message });
  } catch (error) {
    console.log(error);
    if (!/4.*/g.test(status)) {
      status = 500;
    }
    message = error.message;

    res.status(status).json({ status, message });
  }
});

router.get('/logout', async (req, res) => {
  let status = 200;
  let message = 'success';

  try {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, JWT_SECRET);

    const storedToken = await Token.findOne({ where: { token } });
    if (!storedToken) {
      throw new Error('token is invalid');
    }

    const payload = {
      active: false,
    };

    await Token.update(payload, { where: { user_id: id } });
  } catch (error) {
    console.log(error);

    if (!/4.*/g.test(status)) {
      status = 500;
    }

    message = error.message;
  }

  res.clearCookie('token').status(status).json({ status, message });
});

module.exports = router;
