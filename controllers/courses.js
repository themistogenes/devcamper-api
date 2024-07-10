const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  let msg;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
    msg = `Retrieved courses for bootcamp ${req.params.bootcampId}`;
  } else {
    query = Course.find();
    msg = `Retrieved all courses`
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    msg,
    count: courses.length,
    data: courses
  })
})