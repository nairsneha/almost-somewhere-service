import userModel from '../models/userModel.js';

/**
 * Find a user by the given username.
 * @param {String} username username of the user to be found
 * @returns the User
 */
const findUserByUsername = async username => userModel.findOne({ username });

const createUser = async user => userModel.create(user);

const userDao = {
  findUserByUsername: findUserByUsername,
  createUser: createUser,
};

export default userDao;
