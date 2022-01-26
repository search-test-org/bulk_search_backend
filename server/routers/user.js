const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { cookieSetting, jwtSetting } = require('../assets/tokenSetting.js');

const auth = require('../middleware/auth.js');
const User = require('../models/user.js');
const Token = require('../models/token.js');

// check if email is in use
router.post('/email', async (req, res) => {
  const { email } = req.body;
  let status = 200;
  let message = 'success';

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      status = 400;
      throw new Error('email has been in use');
    }
  } catch (error) {
    console.log(error);

    if (!/4.*/g.test(status)) {
      status = 500;
    }
    message = error.message;
  }

  res.status(status).json({ status, message });
});

// create/register a user
router.post('/', async (req, res) => {
  let status = 201;
  let message = 'success';

  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!email || !name || password !== confirmPassword) {
      status = 400;
      throw new Error('invalid email, name, or password');
    }

    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
      status = 400;
      throw new Error('email has been in used');
    }

    // hash password and create new user
    const hashedPW = await bcrypt.hash(password, 8);
    const { id } = await User.create({ name, email, password: hashedPW });
    const token = jwt.sign(
      {
        ...jwtSetting,
        id,
        email,
        name,
      },
      JWT_SECRET
    );

    // store the token
    await Token.create({ user_id: id, token, active: true });

    res
      .cookie('token', token, cookieSetting)
      .status(status)
      .json({ status, message, data: { id, name, email } });
  } catch (error) {
    console.log(error);
    if (!/4.*/g.test(status)) {
      status = 500;
    }
    message = error.message;
    res.status(status).json({ status, message });
  }
});

router.get('/', auth, async (req, res) => {
  let status = 200;
  let message = 'success';
  let data = null;
  try {
  } catch (error) {
    console.log(error);
    if (!/4.*/g.test(status)) {
      status = 500;
    }
    message = error.message;
  }
  res.status(status).json({ status, message, data });
});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  let status = 200;
  let message = 'success';
  let data = null;
  try {
  } catch (error) {
    console.log(error);
    if (!/4.*/g.test(status)) {
      status = 500;
    }
    message = error.message;
  }
  res.status(status).json({ status, message, data });
});

router.patch('/:id', auth, async (req, res) => {
  const { id } = req.params;
  let status = 200;
  let message = 'success';
  let data = null;
  try {
  } catch (error) {
    console.log(error);
    if (!/4.*/g.test(status)) {
      status = 500;
    }
    message = error.message;
  }
  res.status(status).json({ status, message, data });
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  let status = 200;
  let message = 'success';
  let data = null;
  try {
  } catch (error) {
    console.log(error);
    if (!/4.*/g.test(status)) {
      status = 500;
    }
    message = error.message;
  }
  res.status(status).json({ status, message, data });
});

module.exports = router;
