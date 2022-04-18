import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import ResponseStatus from '../dtos/ResponseStatus.js';
import userDao from '../daos/user-dao.js';

/**
 * Creates a new user in the database using the given credentials. Hashes the password provided before
 * saving.
 * Throws an error if the user with the given username already exists; or if validation fails.
 * Expects an object of the type {@link userSchema}.
 * @param {{username: String, password: String, role: string}} newUser
 * @returns a {@link ResponseStatus} with the created user.
 */
const createUserHandler = async newUser => {
  if (!newUser.password) {
    return new ResponseStatus(false, 'No password given', {}, StatusCodes.BAD_REQUEST);
  }

  if (await userDao.findUserByUsername(newUser?.username)) {
    return new ResponseStatus(
      false,
      'User with the given username already exists',
      {},
      StatusCodes.BAD_REQUEST,
    );
  }

  // TODO: Sign and return JWT
  try {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const userToBeCreated = { ...newUser, password: hashedPassword };
    const something = await userDao.createUser(userToBeCreated);
    return new ResponseStatus(true, 'user created', something, StatusCodes.OK);
  } catch (error) {
    return new ResponseStatus(false, error.message, {}, StatusCodes.BAD_REQUEST);
  }
};

export default createUserHandler;
