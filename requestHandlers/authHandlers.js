import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import ResponseStatus from '../dtos/ResponseStatus';
import userDao from '../daos/user-dao';

/**
 * Creates a new user in the database using the given credentials. Hashes the password provided before
 * saving.
 * Throws an error if the user with the given username already exists; or if validation fails.
 * Expects an object of the type {@link userSchema}.
 * @param {{username: String, password: String, role: string}} newUser
 * @returns
 */
const createUserHandler = async newUser => {
  if (!newUser.password) {
    return new ResponseStatus(false, 'No password given', {}, StatusCodes.BAD_REQUEST);
  }

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
