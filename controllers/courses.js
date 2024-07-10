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
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description'
    });
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

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    msg: `Retrieved course ${req.params.id}`,
    data: course
  })
})