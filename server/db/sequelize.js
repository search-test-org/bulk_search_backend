const Sequelize = require('sequelize');

const {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  LOCAL_DB_HOST,
  LOCAL_DB_PORT,
  LOCAL_DB_DATABASE,
  LOCAL_DB_USER,
  LOCAL_DB_PASSWORD,
} = process.env;

const isLocal = process.env.ENV === 'local';

const database = isLocal ? LOCAL_DB_DATABASE : DB_DATABASE;
const host = isLocal ? LOCAL_DB_HOST : DB_HOST;
const user = isLocal ? LOCAL_DB_USER : DB_USER;
const password = isLocal ? LOCAL_DB_PASSWORD : DB_PASSWORD;
const port = isLocal ? LOCAL_DB_PORT : DB_PORT;

const sequelize = new Sequelize(database, user, password, {
  dialect: 'postgres',
  protocol: 'postgres',
  host: host,
  port: port,
  loggin: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
