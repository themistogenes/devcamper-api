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
  .post(addCourse) // /api/v1/bootcamps/:bootcampId/courses

router.route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse)

module.exports = router;