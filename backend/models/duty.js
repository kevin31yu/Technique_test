const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Duty = sequelize.define('Duty', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Auto-increment the ID
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Name is required
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = Duty;
