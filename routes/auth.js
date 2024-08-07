const express = require('express');
const { 
  register, 
  login, 
  getMe, 
  forgotPassword,
  resetPassword,
  updateDetails
} = require('../controllers/auth');

const router = express.Router();

// Auth protect middleware
const { protect } = require('../middleware/auth');

// /api/v1/auth/register
router.post('/register', register);

// /api/v1/auth/login
router.post('/login', login);

// /api/v1/auth/me
router.get('/me', protect, getMe);

// /api/v1/auth/updatedetails
router.put('/updatedetails', protect, updateDetails);

// /api/v1/auth/forgotpassword
router.post('/forgotpassword', forgotPassword);

// /api/v1/auth/forgotpassword
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;