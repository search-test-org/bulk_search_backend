const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize.js');

const User = require('./user.js');

const Token = sequelize.define(
  'token',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = Token;
