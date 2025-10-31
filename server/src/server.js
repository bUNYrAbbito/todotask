require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

// ✅ Correct
app.use("/api/auth", authRoutes); // register & login - public
app.use("/api/todos",  todoRoutes); // protected
app.use("/api/admin",  adminRoutes); // protected

// global error fallback
app.use((err, req, res, next) => {
  console.error('Unhandled error', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
