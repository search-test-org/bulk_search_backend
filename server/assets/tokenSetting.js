require('dotenv').config();

const isLocal = process.env.ENV === 'local';

const cookieSetting = {
  httpOnly: true,
  sameSite: isLocal ? 'lax' : 'none',
  secure: isLocal ? false : true,
  maxAge: 1000 * 60 * 30,
};

const jwtSetting = {
  exp: Math.floor(Date.now() / 1000) + 60 * 30, // expires in 30 mins
};

module.exports = {
  cookieSetting,
  jwtSetting,
};
