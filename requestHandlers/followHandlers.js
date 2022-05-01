import {StatusCodes} from "http-status-codes";
import ResponseStatus from '../dtos/ResponseStatus.js';
import bioDao from "../daos/bioDao.js";

/**
 * Adds the given username to logged in user's following list,
 * Adds the logged in user's username to given username's follower list.
 * @param username
 * @param followUsername
 * @returns {Promise<ResponseStatus>}
 */
 export const followHandler = async (username, followUsername) => {

    const following = await bioDao.addToFollowing(username, followUsername.username);
    const follower = await bioDao.addToFollower(followUsername.username, username);

    if (!following || !follower) {
        return new ResponseStatus( false,
                                   'This username does not exist',
                                   {},
                                   StatusCodes.BAD_REQUEST,);
    }

    return new ResponseStatus(true, 'Follow', following, StatusCodes.OK);
};


/**
 * Removes the given username from logged in user's following list,
 * Removes the logged in user's username from given username's follower list.
 * @param username
 * @param followUsername
 * @returns {Promise<ResponseStatus>}
 */
 export const unfollowHandler = async (username, followUsername) => {

    const following = await bioDao.removeFromFollowing(username, followUsername.username);
    const follower = await bioDao.removeFromFollower(followUsername.username, username);

    if (!following || !follower) {
        return new ResponseStatus( false,
                                   'This username does not exist',
                                   {},
                                   StatusCodes.BAD_REQUEST,);
    }

    return new ResponseStatus(true, 'Unfollow', following, StatusCodes.OK);
};