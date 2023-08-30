// app.js
require('dotenv').config();
const express = require("express");
const sequelize = require('./config/database');
const guestController = require('./controllers/guestController');
const adminController = require('./controllers/adminController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes

// Guest Routes
app.get('/guest', guestController.showGuest);
app.post('/guest', guestController.addGuest);

// Admin Routes
app.post('/admin/register', adminController.register);
app.post('/admin/login', adminController.login);

// Start the server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
