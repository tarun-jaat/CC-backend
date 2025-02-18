const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  name: String,
  company: String,
  phone: String,
  email: String,
  message: String,
  date: Date, 
  time: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meeting', MeetingSchema); 