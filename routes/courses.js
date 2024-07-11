const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse
} = require('../controllers/courses');

const router = express.Router({ mergeParams: true });

// /api/v1/courses
router.route('/')
  .get(getCourses)
  .post(addCourse) // /api/v1/bootcamps/:bootcampId/courses

router.route('/:id')
  .get(getCourse)
  .put(updateCourse)

module.exports = router;