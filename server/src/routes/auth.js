const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { registerValidator, loginValidator } = require('../utils/validators');

const router = express.Router();

// POST /api/auth/register
router.post('/register', registerValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return validation errors in a consistent format
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array().map(err => ({ field: err.param, message: err.msg }))
    });
  }

  const { email, username, password } = req.body;
  try {
    // check user exists
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({ 
        error: 'Registration failed',
        message: 'Email or username already in use'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({ 
      email, 
      username, 
      password: hashed,
      role: 'user' // ensure default role is set
    });
    await user.save();

    // Return success with useful message
    return res.status(201).json({ 
      message: 'User registered successfully',
      user: { id: user._id, email, username, role: user.role }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error', message: 'Could not complete registration' });
  }
});

// POST /api/auth/login
router.post('/login', loginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array().map(err => ({ field: err.param, message: err.msg }))
    });
  }

  const { credential, password } = req.body; // credential is email or username
  try {
    const user = await User.findOne({ $or: [{ email: credential }, { username: credential }] });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { 
      expiresIn: process.env.TOKEN_EXPIRES_IN || '7d'
    });

    res.json({ 
      token,
      user: { 
        id: user._id, 
        email: user.email, 
        username: user.username, 
        role: user.role 
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error', message: 'Could not complete login' });
  }
});

module.exports = router;
