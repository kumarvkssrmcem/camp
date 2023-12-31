const express = require('express');
const router = express.Router({mergeParams: true});  //normally it dosen't take the id so we use it
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')

const Campground = require('../models/campground');
const Review = require('../models/review.js');
const reviews = require('../controllers/reviews')

const { ReviewSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');



router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedIn,isReviewAuthor, catchAsync(reviews.deleteReview)) 

module.exports = router;