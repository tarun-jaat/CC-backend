const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');

router.post('/', async (req, res) => {
  try { 
    const meeting = new Meeting(req.body);
    await meeting.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router; 