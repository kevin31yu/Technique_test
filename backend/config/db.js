const { Client } = require('pg'); // Import the native pg client
require('dotenv').config();

// Create a new PostgreSQL client to check the existence of the DB
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to create the database if it doesn't exist
const createDatabaseIfNotExists = async () => {
  try {
    await client.connect(); // Connect to the PostgreSQL server
    await client.query(`CREATE DATABASE "${process.env.DB_NAME}"`); // Create the database
    console.log(`Database ${process.env.DB_NAME} created.`);
  } catch (err) {
    if (err.code === '42P04') {
      console.log(`Database ${process.env.DB_NAME} already exists.`);
    } else {
      console.error('Error creating database:', err);
    }
  } finally {
    await client.end(); // End the client connection
  }
};

// Function to connect to the database
const connectToDatabase = async () => {
  const dbClient = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME, // Specify the database name here
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    await dbClient.connect(); // Connect to the database
    return dbClient; // Return the connected client for further operations
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Rethrow the error for further handling
  }
};

// Function to check the Duty table
const checkIfTableExists = async (dbClient) => {
  const checkTableQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'duty'
    );
  `;

  try {
    const result = await dbClient.query(checkTableQuery);
    return result.rows[0].exists;
  } catch (error) {
    console.error('Error checking table existence:', error);
    throw error;
  }
};

// Function to create the Duty table
const createDutyTable = async (dbClient) => {
  const tableExists = await checkIfTableExists(dbClient);

  if (tableExists) {
    console.log('Table Duty already exists.');
    return;
  }

  const createTableQuery = `
    CREATE TABLE Duty (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await dbClient.query(createTableQuery); // Execute the query to create the table
    console.log('Table created successfully.');
  } catch (error) {
    console.error('Error creating Duty table:', error);
  }
};


// Main function to initialize the database
const initDatabase = async () => {
  await createDatabaseIfNotExists(); // Ensure the database is created
  const dbClient = await connectToDatabase(); // Now connect to the newly created database
  await createDutyTable(dbClient); // Finally, create the Duty table
  await dbClient.end(); // Close the database connection
};

// Export the initDatabase and connectToDatabase functions
module.exports = {
  initDatabase,
  connectToDatabase,
};
