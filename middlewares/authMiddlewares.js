import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import canDeleteAnyReview from '../permissions/canDeleteAnyReview.js'

/**
 * Authenticates the user using the access token provided in the authorization header of the request.
 * Expects a Bearer authorization header in the given format : 'Bearer *ACCESS TOKEN*'.
 *
 * Sets the `req.user` to the authenticated user and delegates the control to the next middleware.
 */
export const authenticate = (req, res, next) => {
  // Expects a bearer token, i.e 'Bearer *ACCESS TOKEN*'
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
  // Because we don't need to return anything if we call next();
  // eslint-disable-next-line consistent-return
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
    // we can't set req
    req.user = user;
    next();
  });
};


/**
 * Authenticates the user role for deleting any review.
 */
export const authDeleteAnyReview = (req, res, next) => {
    console.log("in hereee")
    if (!canDeleteAnyReview(req.user)) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }   
    next();
}