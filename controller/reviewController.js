import { StatusCodes } from 'http-status-codes';
import {
  getAllReviewsByPlaceHandler,
  getAllReviewsByUserHandler,
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


/**
 * Retrieves the reviews of the place with the given placeId.
 */
const getAllReviewsByPlace = async (req, res) => {
  try {
    //   authenticate(req, res, next);
    const response = await getAllReviewsByPlaceHandler(req.params.placeId);
    res.status(response.status || StatusCodes.OK).json(response);
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
  }
}

/**
 * Retrieves the reviews of the user with the given username.
 */
const getAllReviewsByUser = async (req, res) => {
  try {
    //   authenticate(req, res, next);
    const response = await getAllReviewsByUserHandler(req.params.username);
    res.status(response.status || StatusCodes.OK).json(response);
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
  }
}

const reviewController = app => {
  app.get('/places/details/:placeId/reviews', getAllReviewsByPlace)
  app.get('/username/:username/reviews', getAllReviewsByUser)
  app.post('/review', authenticate, createReview);
}

export default reviewController;