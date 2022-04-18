import mongoose from 'mongoose';
import userSchema from '../schemas/user-schema';

const userModel = mongoose.model('UserModel', userSchema);

export default userModel;
