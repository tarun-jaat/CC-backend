require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const meetingRoutes = require('./routes/meetingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors({
  origin: ['https://corporatecruise.in/', 'https://www.corporatecruise.in/'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
      console.error('MongoDB connection error:', err);
      setTimeout(connectWithRetry, 5000); 
    });
};

connectWithRetry();

app.use('/api/schedule-meeting', meetingRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));