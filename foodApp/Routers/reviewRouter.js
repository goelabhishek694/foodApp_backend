const express = require("express");
const reviewRouter = express.Router();
const{protectRoute}=require('../controller/authController');

reviewRouter
.route('/all')
.get(getAllReviews);

reviewRouter
.route('/top3')
.get(top3reviews);

reviewRouter
.route('/:id')
.get(getPlanReviews);

reviewRouter.use(protectRoute)
reviewRouter
.route('/crud')
.post(createReview);

reviewRouter
.route('/crud/:id')
.patch(updateReview)
.delete(deleteReview)

module.exports=reviewRouter;




