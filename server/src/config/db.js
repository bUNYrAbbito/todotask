// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async (MONGO_URL) => {
  try {
    if (!MONGO_URL) {
      throw new Error('MongoDB connection string is missing');
    }

    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
