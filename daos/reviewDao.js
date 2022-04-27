import reviewModel from '../models/reviewModel.js';

/**
 * Create a review with the userReview object having all params.
 * It calls the create method of mongo to crate a new collection for user.
 * @param userReview the object of the review to be created.
 */


const createUserReview = async userReview => reviewModel.create(userReview);

const reviewDao = {
    createUserReview
};
  
export default reviewDao;