import { StatusCodes } from 'http-status-codes';
import {
  // getReviewHandler,
  createReviewHandler,
  // updateReviewHandler,
} from '../requestHandlers/reviewHandlers.js';
import authenticate from '../middlewares/authMiddlewares.js';

/**
 * Creates a review by user for the place with given 
 * placeId and username (from frontend in body)
 * It adds text, rating
 * @param req the http request from the client
 * @param res the http response sent to client
 */
 const createReview = async (req, res) => {
  try {
    const response = await createReviewHandler(req.body);
    //   authenticate(req, res, next);
    res.status(response.status || StatusCodes.OK).json(response);
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
  }
};

const reviewController = app => {
  // app.get('/places/details/:placeId/reviews', getReviews)
  app.post('/review', authenticate, createReview);
}

export default reviewController;