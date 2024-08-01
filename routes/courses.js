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

// protect & authorize middleware
const { protect, authorize } = require('../middleware/auth');

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
  // /api/v1/bootcamps/:bootcampId/courses
  .post(protect, authorize('publisher', 'admin'), addCourse) 

// /api/v1/courses/:id
router.route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'admin'), deleteCourse)

module.exports = router;