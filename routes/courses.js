const express = require('express');
const {
  getCourses
} = require('../controllers/courses');

const router = express.Router({ mergeParams: true });

// /api/v1/courses
router.route('/')
  .get(getCourses);

module.exports = router;