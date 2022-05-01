import userModel from '../models/userModel.js';


/**
 * Retrieves the followers of the given username. Uses the findOne method to retrieve the
 * unique collection with the username.
 * @param givenUsername the username whose record is to be retrieved.
 */
 const getFollowers = async givenUsername => userModel.findOne({ username: givenUsername  }).select('followers');


/**
 * Retrieves the following list of the given username. Uses the findOne method to retrieve the
 * unique collection with the username.
 * @param givenUsername the username whose record is to be retrieved.
 */
 const getFollowing = async givenUsername => userModel.findOne({ username: givenUsername  }).select('following');

/**
 * Adds the first user to second user's following list
 * @param givenUsername the username whose record is to be retrieved.
 */
 const addToFollowing = async (givenUsername, followUsername) => userModel.findOneAndUpdate(
    { username: givenUsername },
    { $push: { following: followUsername } },
    {new: true}
  );;

/**
 * Adds the first user to second user's follower list
 * @param givenUsername the username whose record is to be retrieved.
 */
 const addToFollower = async (givenUsername, followUsername) => userModel.findOneAndUpdate(
    { username: givenUsername },
    { $push: { follower: followUsername } },
    {new: true}
  );;

/**
 * Removes the first user to second user's following list
 * @param givenUsername the username whose record is to be retrieved.
 */
 const removeFromFollowing = async (givenUsername, followUsername) => userModel.findOneAndUpdate(
    { username: givenUsername },
    { $pull: { following: followUsername } },
    {new: true}
  );;

/**
 * Removes the first user to second user's follower list
 * @param givenUsername the username whose record is to be retrieved.
 */
 const removeFromFollower = async (givenUsername, followUsername) => userModel.findOneAndUpdate(
    { username: givenUsername },
    { $pull: { follower: followUsername } },
    {new: true}
  );;

 const followDao = {
    getFollowers,
    getFollowing,
    addToFollowing,
    addToFollower,
    removeFromFollower,
    removeFromFollowing,
  };
  
  export default followDao;