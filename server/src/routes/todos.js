const express = require('express');
const { validationResult } = require('express-validator');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');
const permit = require('../middleware/role');
const { todoValidator } = require('../utils/validators');

const router = express.Router();

// GET /api/todos
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const todos = await Todo.find().populate('user', 'username email');
      return res.json(todos);
    } else {
      const todos = await Todo.find({ user: req.user.id });
      return res.json(todos);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/todos
router.post('/', auth, todoValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, description, dueDate, category } = req.body;
    const todo = new Todo({
      title, description, dueDate: dueDate || null, category: category || 'Non-Urgent', user: req.user.id
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/todos/:id
router.put('/:id', auth, todoValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    // only owner or admin can update
    if (req.user.role !== 'admin' && todo.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { title, description, dueDate, category, completed } = req.body;
    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.dueDate = dueDate ?? todo.dueDate;
    todo.category = category ?? todo.category;
    if (typeof completed === 'boolean') todo.completed = completed;

    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/todos/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    if (req.user.role !== 'admin' && todo.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await todo.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
