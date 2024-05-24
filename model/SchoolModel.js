const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/Sequlize.js');

const schoolData = sequelize.define('school', {

  school_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  school_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:null,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:null,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue:null,
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
});

module.exports = schoolData;