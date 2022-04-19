import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ResponseStatus from '../dtos/ResponseStatus.js';
import userDao from '../daos/user-dao.js';
import { JWT_SECRET } from '../config.js';

const generateAccessToken = dbUser => {
  const userWithoutPassword = {
    username: dbUser.username,
    role: dbUser.role,
  };

  const accessToken = jwt.sign(userWithoutPassword, JWT_SECRET);

  return { accessToken };
};

/**
 * Creates a new user in the database using the given credentials. Hashes the password provided before
 * saving.
 * Throws an error if the user with the given username already exists; or if validation fails.
 * Expects an object of the type {@link userSchema}.
 * @param {{username: String, password: String, role: string}} newUser
 * @returns a {@link ResponseStatus} with the created user.
 */
export const createUserHandler = async newUser => {
  if (!newUser.password) {
    return new ResponseStatus(false, 'No password given', {}, StatusCodes.BAD_REQUEST);
  }

  // Check the uniqueness of the username
  if (await userDao.findUserByUsername(newUser?.username)) {
    return new ResponseStatus(
      false,
      'User with the given username already exists',
      {},
      StatusCodes.BAD_REQUEST,
    );
  }

  // All good, proceed to create the user
  try {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const userToBeCreated = { ...newUser, password: hashedPassword };
    const createdUser = await userDao.createUser(userToBeCreated); // might throw validation errors
    const accessToken = generateAccessToken(createdUser);
    return new ResponseStatus(true, 'user created', accessToken, StatusCodes.OK);
  } catch (error) {
    return new ResponseStatus(false, error.message, {}, StatusCodes.BAD_REQUEST);
  }
};

/**
 * Logs in the user with the given username and unhashed password.
 * Throws an error if the user with the given username and password doesn't exist.
 *
 * @param {{username: String, password: String}} user user to be logged in
 * @returns a {@link ResponseStatus} with the logged in user
 */
export const loginUserHandler = async user => {
  const dbUser = await userDao.findUserByUsername(user?.username);

  const errorResponse = new ResponseStatus(
    false,
    'Wrong username or password',
    {},
    StatusCodes.UNAUTHORIZED,
  );

  if (!dbUser) {
    return errorResponse;
  }

  try {
    if (await bcrypt.compare(user.password, dbUser.password)) {
      const accessToken = generateAccessToken(dbUser);
      return new ResponseStatus(true, 'Logged in', accessToken, StatusCodes.OK);
    }

    return errorResponse;
  } catch (err) {
    return new ResponseStatus(false, err.message, {}, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
