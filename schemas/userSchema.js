import mongoose from 'mongoose';
import roles from '../roles.js';

// Schema for the user. We will identify each user by their username.
const userSchema = mongoose.Schema({
  username: { type: String, unique: true, lowercase: true, minLength: 3, required: true },
  password: { type: String, required: true, minLength: 3 },
  role: { type: String, default: roles.BASIC, enum: [roles.BASIC, roles.ADMIN], lowercase: true },
});

export default userSchema;
