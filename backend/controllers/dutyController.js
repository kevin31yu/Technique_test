const Duty = require('../models/duty');
const { connectToDatabase } = require('../config/db');

// Get all duties
exports.getDuties = async (req, res) => {
  const dbClient = await connectToDatabase(); // Connect to the database
  try {
    const result = await dbClient.query('SELECT * FROM Duty'); // Query all duties
    const duties = result.rows.map(row => new Duty(row.id, row.name, row.created_at, row.updated_at)); // Map results to Duty instances
    res.status(200).json(duties); // Return the duties
  } catch (error) {
    console.error('Failed to retrieve duties:', error);
    res.status(500).json({ error: 'Failed to retrieve duties' });
  } finally {
    await dbClient.end(); // Close the database connection
  }
};

// Create a new duty
exports.createDuty = async (req, res) => {
  const dbClient = await connectToDatabase(); // Connect to the database
  try {
    const { name } = req.body;
    const result = await dbClient.query('INSERT INTO Duty (name) VALUES ($1) RETURNING *', [name]); // Insert new duty
    const newDuty = new Duty(result.rows[0].id, result.rows[0].name, result.rows[0].created_at, result.rows[0].updated_at); // Create new Duty instance
    res.status(201).json(newDuty); // Return the created duty
  } catch (error) {
    console.error('Failed to create duty:', error);
    res.status(500).json({ error: 'Failed to create duty' });
  } finally {
    await dbClient.end(); // Close the database connection
  }
};

// Update an existing duty
exports.updateDuty = async (req, res) => {
  const dbClient = await connectToDatabase(); // Connect to the database
  const { id } = req.params; // Get the duty ID from the request parameters
  const { name } = req.body; // Get the new name from the request body

  try {
    // Check if the duty exists
    const result = await dbClient.query('SELECT * FROM Duty WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Duty not found' });
    }

    // Update the duty
    await dbClient.query('UPDATE Duty SET name = $1 WHERE id = $2', [name, id]);
    const updatedDuty = new Duty(id, name, result.rows[0].created_at, new Date()); // Create updated Duty instance
    res.status(200).json(updatedDuty); // Return the updated duty
  } catch (error) {
    console.error('Failed to update duty:', error);
    res.status(500).json({ error: 'Failed to update duty' });
  } finally {
    await dbClient.end(); // Close the database connection
  }
};

// Delete a duty
exports.deleteDuty = async (req, res) => {
  const dbClient = await connectToDatabase(); // Connect to the database
  const { id } = req.params; // Get the duty ID from the request parameters

  try {
    // Check if the duty exists
    const result = await dbClient.query('SELECT * FROM Duty WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Duty not found' });
    }

    // Delete the duty
    await dbClient.query('DELETE FROM Duty WHERE id = $1', [id]);
    res.status(204).send(); // Send no content response
  } catch (error) {
    console.error('Failed to delete duty:', error);
    res.status(500).json({ error: 'Failed to delete duty' });
  } finally {
    await dbClient.end(); // Close the database connection
  }
};
