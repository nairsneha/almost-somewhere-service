import mongoose from 'mongoose';
import bioSchema from "../schemas/bioSchema.js";

const bioModel = mongoose.model('Bio', bioSchema);

export default bioModel;
