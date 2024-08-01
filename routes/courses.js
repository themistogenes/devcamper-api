const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');
const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

// Auth protect middleware
const { protect } = require('../middleware/auth');

// /api/v1/courses
router.route('/')
  .get(
    advancedResults(
      Course, 
      {
        path: 'bootcamp',
        select: 'name description'
      }
    ), 
    getCourses
  )
  .post(protect, addCourse) // /api/v1/bootcamps/:bootcampId/courses

// /api/v1/courses/:id
router.route('/:id')
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse)

module.exports = router;