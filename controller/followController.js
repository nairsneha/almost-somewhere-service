import { StatusCodes } from 'http-status-codes';
import {
  followHandler,
  unfollowHandler,
  getFollowingHandler,
  getFollowersHandler
} from '../requestHandlers/followHandlers.js';
import {authenticate} from '../middlewares/authMiddlewares.js';


/**
 * Adds the given username to logged in user's following list,
 * Adds the logged in user's username to given username's follower list.
 * @param req the http request from the client
 * @param res the http response sent to client
 */
 const follow = async (req, res) => {
    try {
      const response = await followHandler(req.user.username, req.body);
      res.status(response.status || StatusCodes.OK).json(response);
    } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
    }
  }

/**
 * Removes the given username from logged in user's following list,
 * Removes the logged in user's username from given username's follower list.
 * @param req the http request from the client
 * @param res the http response sent to client
 */
 const unfollow = async (req, res) => {
    try {
      const response = await unfollowHandler(req.user.username, req.params.placeId, req.body);
      res.status(response.status || StatusCodes.OK).json(response);
    } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
    }
  }


/**
 * Gets the follower list of given username
 * @param req the http request from the client
 * @param res the http response sent to client
 */
 const getFollowers = async (req, res) => {
    try {
      const response = await getFollowersHandler(req.user.username, req.params.placeId, req.body);
      res.status(response.status || StatusCodes.OK).json(response);
    } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
    }
  }

/**
 * Gets the follower list of given username
 * @param req the http request from the client
 * @param res the http response sent to client
 */
 const getFollowing = async (req, res) => {
    try {
      const response = await getFollowingHandler(req.user.username, req.params.placeId, req.body);
      res.status(response.status || StatusCodes.OK).json(response);
    } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
    }
  }
  

const followController = app => {
    app.put('/follow', authenticate, follow)
    app.put('/unfollow', authenticate, unfollow)
    app.get('/followers/:username', authenticate, getFollowers)
    app.get('/following/:username', authenticate, getFollowing)
}

export default followController