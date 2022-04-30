import roles from '../roles.js';

/**
 * Authenticates the user to del any review.
 */
export const canDelAnyReview = (user) => (
        user.role === roles.ADMIN || user.role === roles.MOD
    ); 

/**
 * Authenticates the user to create update any review.
 */
export const canCreateUpdateDeleteReview = (user, givenUser) => (
    user.username === givenUser
); 
