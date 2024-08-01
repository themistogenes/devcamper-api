const express = require('express');
const { register, login } = require('../controllers/auth');

const router = express.Router();

// /api/v1/auth/register
router.post('/register', register);

// /api/v1/auth/login
router.post('/login', login);

module.exports = router;