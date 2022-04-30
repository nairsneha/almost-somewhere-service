import bioModel from '../models/bioModel.js';

/**
 * Create a user with the userBio object having all params.
 * It calls the create method of mongo to crate a new collection for user.
 * @param userBio the object of the bio to be created.
 */
const createUserBio = async userBio => bioModel.create(userBio);

/**
 * Updtates the bio of the user with the given username.
 * @param userBio the bio object with the new params for the given username.
 */
const updateUserBio = async (givenUsername,userBio) =>
  bioModel.updateOne(
    { username: givenUsername },
    {
      $set: {
        firstname: userBio.firstname,
        lastname: userBio.lastname,
        gender: userBio.gender,
        age: userBio.age,
        favorites: userBio.favorites,
        followers: userBio.followers,
        following: userBio.following,
        profilePhotoURL: userBio.profilePhotoURL,
        bannerPhotoURL: userBio.profilePhotoURL
      },
    },
  );


/**
 * Updtates the verified status of the user with the given username.
 * @param givenUsername
 * @param verifiedStatus 
 */
 const updateUserVerified = async (givenUsername, verifiedStatus) =>
 bioModel.findOneAndUpdate(
   { username: givenUsername },
   {
     $set: {
       verified: verifiedStatus.verified
     },
   },
   {new: true}
 );


/**
 * Retrieves the bio of the user with the given username. Uses the findOne method to retrieve the
 * unique collection with the username. Filters sensitive info.
 * @param givenUsername the username whose record is to be retrieved.
 */
const getUserBio = async givenUsername => bioModel.findOne({ username: givenUsername  }).select('-favorites');

/**
 * Retrieves the bio of the user with the given username. Uses the findOne method to retrieve the
 * unique collection with the username.
 * @param givenUsername the username whose record is to be retrieved.
 */
 const getSensitiveUserBio = async givenUsername => bioModel.findOne({ username: givenUsername });


const bioDao = {
  createUserBio,
  updateUserBio,
  getUserBio,
  updateUserVerified,
  getSensitiveUserBio
};

export default bioDao;
