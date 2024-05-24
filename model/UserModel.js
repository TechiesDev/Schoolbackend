const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/Sequlize.js');

const userData = sequelize.define('users', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = userData;