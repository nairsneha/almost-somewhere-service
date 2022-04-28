import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        postedBy: {
            profilePhotoURL: {type: String},
            username: {type: String}
        },
        text: {type: String},
        rating: {type: Number},
        placeId: {type: String},
        // placeName: {type: String}
    }
);
export default reviewSchema;