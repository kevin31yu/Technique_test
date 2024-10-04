// routes/dutyRoutes.js
const express = require('express');
const { getDuties, createDuty, updateDuty, deleteDuty } = require('../controllers/dutyController');

const router = express.Router();

// Define routes
router.get('/duties', getDuties);
router.post('/duties', createDuty);
router.put('/duties/:id', updateDuty);
router.delete('/duties/:id', deleteDuty);

module.exports = router;
