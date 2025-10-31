const { body } = require('express-validator');

const registerValidator = [
  body('email').isEmail().withMessage('Invalid email'),
  body('username').isLength({ min: 3 }).withMessage('Username min 3 chars'),
  body('password').isLength({ min: 8 }).withMessage('Password min 8 chars')
];

const loginValidator = [
  body('credential').notEmpty().withMessage('Email or username required'),
  body('password').notEmpty().withMessage('Password is required')
];

const todoValidator = [
  body('title').isLength({ min: 1, max: 100 }).withMessage('Title required, max 100'),
  body('description').optional().isLength({ max: 500 }).withMessage('Max 500 chars'),
  body('category').optional().isIn(['Urgent', 'Non-Urgent'])
];

module.exports = { registerValidator, loginValidator, todoValidator };
