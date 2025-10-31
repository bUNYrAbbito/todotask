const express = require('express');
const User = require('../models/User');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');
const permit = require('../middleware/role');

const router = express.Router();

// All routes here require admin
router.use(auth, permit('admin'));

// GET /api/admin/users
router.get('/users', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// PATCH /api/admin/users/:id/role
router.patch('/users/:id/role', async (req, res) => {
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.role = role;
  await user.save();
  res.json({ message: 'Role updated', user: { id: user._id, role: user.role } });
});

// GET /api/admin/todos
router.get('/todos', async (req, res) => {
  const todos = await Todo.find().populate('user', 'username email');
  res.json(todos);
});

module.exports = router;
