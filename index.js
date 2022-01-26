const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const auth = require('./server/middleware/auth.js');

app.use(compression());
app.use(helmet());
app.use(cookieParser());

// allow parsing data in request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// config cors
const whitelist = require('./server/assets/whitelist.js');
const corsConfig = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // allow server to server or postman requests
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
// app.use(cors(corsConfig));
app.use(cors({ origin: true, credentials: true }));

// connect to database
const sequelize = require('./server/db/sequelize.js');
sequelize
  .authenticate()
  .then(() => console.log('database connected through sequelize'))
  .catch((err) => console.log(err));
sequelize.sync();

// check if the service is alive
app.get('/', (req, res) => {
  res.send(`server is working at ${new Date()}`);
});

// routes
const AuthRouter = require('./server/routers/authentication.js');
app.use('/auth', AuthRouter);
const UserRouter = require('./server/routers/user.js');
app.use('/user', UserRouter);
const SearchRouter = require('./server/routers/search.js');
app.use('/search', auth, SearchRouter); // requires auth for all routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`server starts on port ${PORT} at ${new Date()}`);
});
