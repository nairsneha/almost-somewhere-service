import mongoose from 'mongoose';
import reviewSchema from "../schemas/reviewSchema.js";

const reviewModel = mongoose.model('Review', reviewSchema);

export default reviewModel;
