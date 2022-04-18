import userModel from '../models/user-model.js';

/**
 * Find a user by the given username.
 * @param {String} username username of the user to be found
 * @returns the User
 */
const findUserByUsername = async username => userModel.findOne({ username });

const createUser = async user => userModel.create(user);

const userDao = {
  findUserByUsername,
  createUser,
};

export default userDao;
