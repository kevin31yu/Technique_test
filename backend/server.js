const express = require('express');
const dotenv = require('dotenv');
const { initDatabase } = require('./config/db');
const cors = require('cors');  // Import CORS
const dutyRoutes = require('./routes/dutyRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors()); // Add this line

// Initialize database and start the server
initDatabase()
  .then(() => {
    // Routes
    app.use('/api', dutyRoutes);

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize the database:', err);
  });
