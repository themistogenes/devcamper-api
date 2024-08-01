const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps');
const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

// Auth protect middleware
const { protect } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

// /api/v1/bootcamps/radius/:zipcode/:distance
router.route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius)

// /api/v1/bootcamps/:id/photo
router.route('/:id/photo')
  .put(protect, bootcampPhotoUpload)

// /api/v1/bootcamps/
router.route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp)

// /api/v1/bootcamps/:id
router.route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp)

module.exports = router;