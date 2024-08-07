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

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

// advancedResults middleware
const advancedResults = require('../middleware/advancedResults');
// protect & authorize middleware
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

// /api/v1/bootcamps/radius/:zipcode/:distance
router.route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius)

// /api/v1/bootcamps/:id/photo
router.route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload)

// /api/v1/bootcamps/
router.route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp)

// /api/v1/bootcamps/:id
router.route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)

module.exports = router;