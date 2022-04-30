import {StatusCodes} from "http-status-codes";
import ResponseStatus from '../dtos/ResponseStatus.js';
import reviewDao from "../daos/reviewDao.js";

/**
 * This is the handler to create the review of the user with the given username.
 * Throws an error if the review could not be created.
 * @param username
 * @param review the review object with the information to be added
 * @returns {Promise<ResponseStatus>} response status with the error message or the success message
 * and the new review object
 */
 export const createReviewHandler = async (username, review) => {

    const userReview = await reviewDao.createUserReview(username, review);

    if (!userReview) {
        return new ResponseStatus( false,
                                   'Review could not be created',
                                   {},
                                   StatusCodes.UNAUTHORIZED,);
    }

    return new ResponseStatus(true, 'Review created', userReview, StatusCodes.OK);
}

/**
 * This is the handler to get the reviews of all users of the given placeId.
 * Throws an error if the placeId does not exist.
 * @param username
 * @param placeId
 * @returns {Promise<ResponseStatus>}
 */
 export const getAllReviewsByPlaceHandler = async (placeId) => {

    const placeReviews = await reviewDao.getAllReviewsByPlace(placeId);

    if (!placeReviews) {
        return new ResponseStatus( false,
                                   'This place does not exist',
                                   {},
                                   StatusCodes.BAD_REQUEST,);
    }

    return new ResponseStatus(true, 'Get Reviews by Place', placeReviews, StatusCodes.OK);
};

/**
 * This is the handler to get the reviews of all places of the given user (username).
 * Throws an error if the placeId does not exist.
 * @param username
 * @returns {Promise<ResponseStatus>}
 */
 export const getAllReviewsByUserHandler = async username => {

    const userReviews = await reviewDao.getAllReviewsByUser(username);

    if (!userReviews) {
        return new ResponseStatus( false,
                                   'This username does not exist',
                                   {},
                                   StatusCodes.BAD_REQUEST,);
    }

    return new ResponseStatus(true, 'Get Reviews by User', userReviews, StatusCodes.OK);
};

/**
 * This is the handler to get the reviews of all places of the given user (username).
 * Throws an error if the placeId does not exist.
 * @param username
 * @returns {Promise<ResponseStatus>}
 */
 export const deleteReviewHandler = async (username, placeId) => {

    const userReview = await reviewDao.getUserReview(username, placeId);
    if (!userReview) {
        return new ResponseStatus( false,
                                   'This username or place does not exist',
                                   {},
                                   StatusCodes.BAD_REQUEST,);
    }

    const review = await reviewDao.deleteReview(userReview.id);
    if (!review) {
        return new ResponseStatus( false,
                                   'This review could not be deleted',
                                   {},
                                   StatusCodes.BAD_REQUEST,);
    }

    return new ResponseStatus(true, 'Review Deleted', review, StatusCodes.OK);
};


/**
 * This is the handler for updating the review of the user with the given username and placeId.
 * Throws an error if the review could not be updated.
 * @param username
 * @param review the review object which has the updated parameters
 * @returns {Promise<ResponseStatus>} response status with the error message or the success message
 * and the new review object
 */
 export const updateReviewHandler = async (username, placeId, review) => {

    const userReview = await reviewDao.updateUserReview(username, placeId, review);
    if (!userReview) {
        return new ResponseStatus( false,
                                   'Review could not be updated',
                                   {},
                                   StatusCodes.BAD_REQUEST,);
    }

    return new ResponseStatus(true, 'Review updated', userReview, StatusCodes.OK);
}