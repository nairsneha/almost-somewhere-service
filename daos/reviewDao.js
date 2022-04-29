import reviewModel from '../models/reviewModel.js';

/**
 * Create a review with the userReview object having all params.
 * It calls the create method of mongo to crate a new collection for user.
 * @param givenUsername
 * @param userReview the object of the review to be created.
 */
const createUserReview = async (givenUsername, userReview) => reviewModel.create({
    postedBy: {
        profilePhotoURL: userReview.profilePhotoURL,
        username: givenUsername,
    },
    text: userReview.text,
    rating: userReview.rating,
    placeId: userReview.placeId,
});

/**
 * Retrieves the reviews of all users with given placeId. Uses the find method to retrieve the
 * unique collection with the username.
 * @param givenPlaceId the placeId whose records are to be retrieved.
 */
 const getAllReviewsByPlace = async (givenPlaceId) => reviewModel.find({placeId: givenPlaceId});

/**
 * Retrieves the reviews of all users with given placeId. Uses the find method to retrieve the
 * unique collection with the username.
 * @param givenUsername the username whose records are to be retrieved.
 */
 const getAllReviewsByUser = async givenUsername => reviewModel.find({'postedBy.username': givenUsername});

/**
 * Deletes the review of the given users for given place with placeId. 
 * @param rid the user whose records are to be retrieved.
 */
 const deleteReview = async rid => reviewModel.deleteOne({id: rid});

/**
 * Updtates the review of the user with the given username and placeId.
 * @param givenUsername
 * @param givenPlaceId
 * @param userReview the review object with the new params for the given username and place.
 */
const updateUserReview = async (givenUsername, givenPlaceId, userReview) =>
 reviewModel.findOneAndUpdate(
    {'postedBy.username': givenUsername, placeId: givenPlaceId},
    {
        $set: {
        text: userReview.text,
        rating: userReview.rating
        }
    },
    { new: true }
 );

/**
 * Retrieves the review of the users with given placeId. Uses the findOne method to retrieve the
 * unique collection with the username.
 * @param username the username whose records are to be retrieved.
 * @param placeId the placeId whose records are to be retrieved.
 */
 const getUserReview = async (username, placeId) => reviewModel.findOne({'postedBy.username' : username, 'placeId': placeId});

 const reviewDao = {
    getAllReviewsByPlace,
    getAllReviewsByUser,
    createUserReview,
    deleteReview,
    updateUserReview,
    getUserReview
};
  
export default reviewDao;