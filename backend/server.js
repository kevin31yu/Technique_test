// server.js
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const cors = require('cors'); // Import CORS
const dutyRoutes = require('./routes/dutyRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors()); // Add this line

// Routes
app.use('/api', dutyRoutes);

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync(); // Sync all defined models to the DB
  })
  .then(() => {
    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
