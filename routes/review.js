const express=require("express");
const router = express.Router({ mergeParams: true });//used mergeParams because the parameter name id get stay in app.js while the other part is present in review
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn ,validateReview,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

//Reviews
//Post Review Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview))

module.exports=router;