// config/database.js
const { Sequelize } = require('sequelize');
const path = require('path');

const databasePath = path.join(__dirname, 'data', 'merkle.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath, // Path to your SQLite database file
});

module.exports = sequelize;
