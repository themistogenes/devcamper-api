const express = require('express');
const {
  getReviews,
  getReview,
  addReview
} = require('../controllers/reviews');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

// advancedResults middleware
const advancedResults = require('../middleware/advancedResults');
// protect & authorize middleware
const { protect, authorize } = require('../middleware/auth');

// /api/v1/reviews
router.route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getReviews
  )
// /api/v1/bootcamps/:bootcampId/reviews
  .post(protect, authorize('user', 'admin'), addReview)

// /api/v1/reviews/:id
router.route('/:id')
  .get(getReview)

module.exports = router;