const express = require('express');
const {
  getCourses,
  getCourse
} = require('../controllers/courses');

const router = express.Router({ mergeParams: true });

// /api/v1/courses
router.route('/')
  .get(getCourses);

router.route('/:id')
  .get(getCourse);

module.exports = router;