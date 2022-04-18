import userModel from '../models/user-model';

const findUserByUsername = async username => userModel.findOne({ username });

const createUser = async user => userModel.create(user);

const userDao = {
  findUserByUsername,
  createUser,
};

export default userDao;
