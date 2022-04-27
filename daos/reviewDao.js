import reviewModel from '../models/reviewModel.js';

/**
 * Create a review with the userReview object having all params.
 * It calls the create method of mongo to crate a new collection for user.
 * @param userReview the object of the review to be created.
 */
const createUserReview = async userReview => reviewModel.create(userReview);

/**
 * Retrieves the reviews of all users with given placeId. Uses the findAll method to retrieve the
 * unique collection with the username.
 * @param username the username whose record is to be retrieved.
 */
 const getAllReviewsByPlace = async givenPlaceId => reviewModel.find({placeId: givenPlaceId});

/**
 * Retrieves the reviews of all users with given placeId. Uses the findAll method to retrieve the
 * unique collection with the username.
 * @param username the username whose record is to be retrieved.
 */
 const getAllReviewsByUser = async givenUsername => reviewModel.find({username: givenUsername});

 const reviewDao = {
    getAllReviewsByPlace,
    getAllReviewsByUser,
    createUserReview
};
  
export default reviewDao;