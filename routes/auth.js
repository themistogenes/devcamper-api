const express = require('express');
const { register } = require('../controllers/auth');

const router = express.Router();

// /api/v1/auth/register
router.post('/register', register);

module.exports = router;