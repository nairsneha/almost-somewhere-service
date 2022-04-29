import mongoose from "mongoose";

const bioSchema = mongoose.Schema(
    {
        username: { type: String, unique: true, lowercase: true, minLength: 3, required: true },
        firstname: { type: String, required: true, minLength: 3 },
        lastname: { type: String, required: true, minLength: 3 },
        gender: { type: String, required: true},
        age: { type: Number, required: true, minLength: 3 },
        favorites: [{ type: String}],
        followers: [{type: String}],
        following: [{type: String}],
        profilePhotoURL: {type: String},
        bannerPhotoURL: {type: String},
        verified: {type: Boolean}
    }
);
export default bioSchema;