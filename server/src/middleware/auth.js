const jwt = require('jsonwebtoken');

// Authentication middleware - expects Authorization: Bearer <token>
const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.set('WWW-Authenticate', 'Bearer');
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = header.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user id and role to req.user for downstream handlers
    req.user = { id: payload.id, role: payload.role };
    return next();
  } catch (err) {
    res.set('WWW-Authenticate', 'Bearer error="invalid_token"');
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;
