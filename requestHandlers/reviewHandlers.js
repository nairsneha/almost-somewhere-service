import {StatusCodes} from "http-status-codes";
import ResponseStatus from '../dtos/ResponseStatus.js';
import reviewDao from "../daos/reviewDao.js";

/**
 * This is the handler to create the review of the user with the given username
 * Throws an error if the review could not be created.
 * @param review the review object with the information to be added
 * @returns {Promise<ResponseStatus>} response status with the error message or the success message
 * and the new review object
 */
 export const createReviewHandler = async review => {

    const userReview = await reviewDao.createUserReview(review);

    if (!userReview) {
        return new ResponseStatus( false,
                                   'Review could not be created',
                                   {},
                                   StatusCodes.UNAUTHORIZED,);
    }

    return new ResponseStatus(true, 'Review created', userReview, StatusCodes.OK);
}
