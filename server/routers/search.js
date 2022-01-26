const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');

const Search = require('../models/search.js');

// all routes need to be authenticated
router.use(auth);

router.post('/', async (req, res) => {
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
  ser.create();
});

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.patch('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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
