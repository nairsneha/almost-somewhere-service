import { StatusCodes } from 'http-status-codes';
import { createUserHandler, loginUserHandler } from '../requestHandlers/authHandlers.js';

/**
 * Creates a new user with the given username, password and role.
 * Throws an error if the username already exists; or if the request body fails validation.
 */
const createNewUser = async (req, res) => {
  try {
    const response = await createUserHandler(req.body);
    res.status(response.status || StatusCodes.OK).json(response.message);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message || 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const response = await loginUserHandler(req.body);
    res.status(response.status || StatusCodes.OK).json(response.message);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message || 'Internal server error' });
  }
};

const authController = app => {
  app.post('/auth/signup', createNewUser);
  app.get('/auth/login', login);
};

export default authController;
