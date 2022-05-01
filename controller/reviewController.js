import { StatusCodes } from 'http-status-codes';
import {
  getAllReviewsByPlaceHandler,
  getAllReviewsByUserHandler,
  createReviewHandler,
  deleteReviewHandler,
  updateReviewHandler
} from '../requestHandlers/reviewHandlers.js';
import {authenticate, authDeleteAnyReview, authOwnReview, authOwnUserReview} from '../middlewares/authMiddlewares.js';

/**
 * Creates a review of logged in user for the place with given placeId.
 * It adds text, rating
 * @param req the http request from the client
 * @param res the http response sent to client
 */
 const createReview = async (req, res) => {
  try {
    const response = await createReviewHandler(req.user.username, req.body);
    res.status(response.status || StatusCodes.OK).json(response);
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
  }
};


/**
 * Retrieves the reviews of the place with the given placeId.
 * @param req the http request from the client
 * @param res the http response sent to client
 */
const getAllReviewsByPlace = async (req, res) => {
  try {
    const response = await getAllReviewsByPlaceHandler(req.params.placeId);
    res.status(response.status || StatusCodes.OK).json(response);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message || 'Bad request' });
  }
}

/**
 * Retrieves the reviews of the logged in user.
 * @param req the http request from the client
 * @param res the http response sent to client
 */
const getAllReviewsByUser = async (req, res) => {
  try {
    const response = await getAllReviewsByUserHandler(req.user.username);
    res.status(response.status || StatusCodes.OK).json(response);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message || 'Bad request' });
  }
}

/**
 * Deletes the review of the logged in user for a place with the given placeId.
 * If admin or mod, deletes the review of any user for a place with the given placeId and username.
 * @param req the http request from the client
 * @param res the http response sent to client
 */
const deleteReview = async (req, res) => {
  if(authOwnReview(req)){
    try {
      const response = await deleteReviewHandler(req.user.username, req.params.placeId);
      res.status(response.status || StatusCodes.OK).json(response);
    } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
    }
  } else if(authDeleteAnyReview(req)){
    try {
      const response = await deleteReviewHandler(req.params.username, req.params.placeId);
      res.status(response.status || StatusCodes.OK).json(response);
    } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
    }
  } else {
    res.sendStatus(StatusCodes.UNAUTHORIZED).json('User not authenticated');
  }
  
}

/**
 * Updates the review of the logged in user for a place with the given placeId.
 * @param req the http request from the client
 * @param res the http response sent to client
 */
const updateReview = async (req, res) => {
  try {
    const response = await updateReviewHandler(req.user.username, req.params.placeId, req.body);
    res.status(response.status || StatusCodes.OK).json(response);
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
  }
}

const reviewController = app => {
  app.get('/reviews/places/:placeId', getAllReviewsByPlace)
  app.get('/reviews', authenticate, getAllReviewsByUser)
  app.post('/reviews', authenticate, createReview)
  app.delete('/reviews/places/:placeId/:username', authenticate, deleteReview)
  app.put('/reviews/places/:placeId', authenticate, authOwnUserReview, updateReview)
}

export default reviewController;