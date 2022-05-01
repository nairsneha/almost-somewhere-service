
import { StatusCodes } from 'http-status-codes';
import {
  getBioHandler,
  getSensitiveBioHandler,
  createBioHandler,
  updateBioHandler,
  updateUserVerifiedHandler
} from '../requestHandlers/bioHandlers.js';
import {authenticate, authUpdateBio, authUpdateUserVerified, authViewSensitiveBio} from '../middlewares/authMiddlewares.js';



/**
 * Retrieves the bio of the user with or without sensitive info of the user depending on role.
 * @param req the http request from the client
 * @param res the http response sent to client
 */

 const getBio = async (req, res) => {
  if(!authViewSensitiveBio(req)){
    try {
      //   authenticate(req, res, next);
      const response = await getBioHandler(req.params.username);
      res.status(response.status || StatusCodes.OK).json(response)
    } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
    }
  } else {
    try {
      //   authenticate(req, res, next);
      const response = await getSensitiveBioHandler(req.params.username);
      res.status(response.status || StatusCodes.OK).json(response)
    } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
    }
  }
};


/**
 * Creates a bio for the user with the given username since its unique
 * It adds details of user like firstname, lastname, gender, age, favorites, followers, following
 * @param req the http request from the client
 * @param res the http response sent to client
 */
const createBio = async (req, res) => {

  try {
    const response = await createBioHandler(req.body);
    //   authenticate(req, res, next);
    res.status(response.status || StatusCodes.OK).json(response);
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
  }
};


/**
 * Updates the bio of the user with new details with given username
 * @param req the http request from the client
 * @param res the http response sent to client
 */
const updateBio = async (req, res) => {


  if(!authUpdateUserVerified(req, res)) {
    try {
      const response = await updateBioHandler(req.user.username, req.body);
      //   authenticate(req, res, next);
      res.status(response.status || StatusCodes.OK).json(response);
    } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
    }
  } else {
    try {
      const response = await updateUserVerifiedHandler(req.params.username, req.body);
      //   authenticate(req, res, next);
      res.status(response.status || StatusCodes.OK).json(response);
    } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
    }
  }

  
};



/**
 * Controller for /auth. Adds all the necessary routes related to authentication to the app.
 * @param app {Express} app the express app to add the routes to
 */
const bioController = app => {

  app.get('/user/:username/bio', authenticate, getBio)
  app.post('/bio', createBio);
  app.put('/user/:username/bio', authenticate, authUpdateBio, updateBio);

};

export default bioController;