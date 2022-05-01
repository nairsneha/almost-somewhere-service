import {StatusCodes} from "http-status-codes";
import ResponseStatus from '../dtos/ResponseStatus.js';
import followDao from "../daos/followDao.js";

/**
 * This is the handler to get the follower list
 * @param username
 * @returns {Promise<ResponseStatus>}
 */
 export const getFollowersHandler = async (username) => {

    const followers = await followDao.getFollowers(username);

    if (!followers) {
        return new ResponseStatus( false,
                                   'This username does not exist',
                                   {},
                                   StatusCodes.BAD_REQUEST,);
    }

    return new ResponseStatus(true, 'Get Followers', followers, StatusCodes.OK);
};

/**
 * This is the handler to get the following list
 * @param username
 * @returns {Promise<ResponseStatus>}
 */
 export const getFollowingHandler = async (username) => {

    const following = await followDao.getFollowering(username);

    if (!following) {
        return new ResponseStatus( false,
                                   'This username does not exist',
                                   {},
                                   StatusCodes.BAD_REQUEST,);
    }

    return new ResponseStatus(true, 'Get Followers', following, StatusCodes.OK);
};


/**
 * Adds the given username to logged in user's following list,
 * Adds the logged in user's username to given username's follower list.
 * @param username
 * @param followUsername
 * @returns {Promise<ResponseStatus>}
 */
 export const followHandler = async (username, followUsername) => {

    const following = await followDao.addToFollowing(username, followUsername);
    const follower = await followDao.addToFollower(followUsername, username);

    console.log(follower)

    if (!following || !follower) {
        return new ResponseStatus( false,
                                   'This username does not exist',
                                   {},
                                   StatusCodes.BAD_REQUEST,);
    }

    return new ResponseStatus(true, 'Get Followers', following, StatusCodes.OK);
};


/**
 * Removes the given username from logged in user's following list,
 * Removes the logged in user's username from given username's follower list.
 * @param username
 * @param followUsername
 * @returns {Promise<ResponseStatus>}
 */
 export const unfollowHandler = async (username, followUsername) => {

    const following = await followDao.removeFromFollowing(username, followUsername);
    const follower = await followDao.removeFromFollower(followUsername, username);

    console.log(follower)

    if (!following || !follower) {
        return new ResponseStatus( false,
                                   'This username does not exist',
                                   {},
                                   StatusCodes.BAD_REQUEST,);
    }

    return new ResponseStatus(true, 'Get Followers', following, StatusCodes.OK);
};