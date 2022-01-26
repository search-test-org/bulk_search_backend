const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize.js');
const bcrypt = require('bcryptjs');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokens: {
      type: DataTypes.JSON,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

User.beforeCreate(async (user, option) => {
  user.password = await bcrypt.hash(user.password, 8);
});

module.exports = User;
