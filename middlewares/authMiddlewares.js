import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import {canDelAnyReview, canCreateUpdateDeleteReview} from '../permissions/reviewPermissions.js'
import {canViewBio, canUpdateBio, canUpdateUserVerified} from '../permissions/bioPermissions.js'
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
// eslint-disable-next-line consistent-return
export const authDeleteAnyReview = (req) => (canDelAnyReview(req.user))

/**
 * Authenticates the user to Create Update own review.
 */
// eslint-disable-next-line consistent-return
export const authOwnUserReview = (req, res, next) => {
  if (!canCreateUpdateDeleteReview(req.user)) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }   
  next();
}

/**
 * Authenticates the user to delete own review.
 */
export const authOwnReview = (req) => (canCreateUpdateDeleteReview(req.user, req.params.username))






/**
 * Authenticates the user to view sensitive bio.
 */
 export const authViewSensitiveBio = (req) => (canViewBio(req.user, req.params.user))

/**
 * Authenticates the user to do CRUD on sensitive Bio.
 */
// eslint-disable-next-line consistent-return
export const authUpdateBio = (req, res, next) => {
  if (!canUpdateBio(req.user, req.params.username)) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }   
  next();
}

/**
 * Authenticates the user to update verified status.
 */
// eslint-disable-next-line consistent-return
export const authUpdateUserVerified = (req) => (canUpdateUserVerified(req.user))

