import { StatusCodes } from 'http-status-codes';
import { createUserHandler, loginUserHandler } from '../requestHandlers/authHandlers.js';

/**
 * Creates a new user with the given username, password and role.
 * Throws an error if the username already exists; or if the request body fails validation.
 *
 * If the user is successfully created, responds with an `accessToken`. This token must be sent with subsequent
 * requests to authenticate the user with the server.
 */
const createNewUser = async (req, res) => {
  try {
    const response = await createUserHandler(req.body);
    res.status(response.status || StatusCodes.OK).json(response);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message || 'Internal server error' });
  }
};

/**
 * Authenticates the user with the given username and password.
 *
 * If the username and password checks out, responds with an `accessToken`. This token must be sent with subsequent
 * requests to authenticate the user with the server.
 */
const login = async (req, res) => {
  try {
    const response = await loginUserHandler(req.body);
    res.status(response.status || StatusCodes.OK).json(response);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message || 'Internal server error' });
  }
};

/**
 * Controller for /auth. Adds all the necessary routes related to authentication to the app.
 * @param {Express} app the express app to add the routes to
 */
const authController = app => {
  app.post('/auth/signup', createNewUser);
  app.get('/auth/login', login);
};

export default authController;
