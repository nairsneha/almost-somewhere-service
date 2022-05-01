import { StatusCodes } from 'http-status-codes';
import {
  followHandler,
  unfollowHandler
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
      const response = await unfollowHandler(req.user.username, req.body);
      res.status(response.status || StatusCodes.OK).json(response);
    } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message || 'User not authenticated' });
    }
  }

  
const followController = app => {
    app.put('/follow', authenticate, follow)
    app.delete('/unfollow', authenticate, unfollow)
}

export default followController