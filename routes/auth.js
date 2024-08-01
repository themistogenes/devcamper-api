const express = require('express');
const { register, login, getMe } = require('../controllers/auth');

const router = express.Router();

// Auth protect middleware
const { protect } = require('../middleware/auth');

// /api/v1/auth/register
router.post('/register', register);

// /api/v1/auth/login
router.post('/login', login);

// /api/v1/auth/me
router.get('/me', protect, getMe);

module.exports = router;