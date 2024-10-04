// controllers/dutyController.js
const Duty = require('../models/duty');

// Get all duties
exports.getDuties = async (req, res) => {
  try {
    const duties = await Duty.findAll();
    res.status(200).json(duties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve duties' });
  }
};

// Create a new duty
exports.createDuty = async (req, res) => {
  try {
    const { name } = req.body;
    const newDuty = await Duty.create({ name });
    res.status(201).json(newDuty);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create duty' });
  }
};

// Update an existing duty
exports.updateDuty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const duty = await Duty.findByPk(id);

    if (!duty) {
      return res.status(404).json({ error: 'Duty not found' });
    }

    duty.name = name;
    await duty.save();
    res.status(200).json(duty);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update duty' });
  }
};

// Delete a duty
exports.deleteDuty = async (req, res) => {
  try {
    const { id } = req.params;
    const duty = await Duty.findByPk(id);

    if (!duty) {
      return res.status(404).json({ error: 'Duty not found' });
    }

    await duty.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete duty' });
  }
};
