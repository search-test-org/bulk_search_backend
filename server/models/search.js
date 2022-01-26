const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize.js');

const User = require('./user.js');

const Search = sequelize.define(
  'search',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    keyword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    searchResult: {
      field: 'search_result',
      type: DataTypes.JSON,
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

module.exports = Search;
