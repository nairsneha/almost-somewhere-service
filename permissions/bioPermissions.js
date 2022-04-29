import roles from "../roles.js";

/**
 * Authenticates the user to view sensitive bio.
 */
export const canViewBio = (user, bioUsername) => (user.username === bioUsername)

/**
 * Authenticates the user to update bio.
 */
export const canUpdateBio = (user, bioUsername) => (
    user.username === bioUsername || user.role === roles.ADMIN
); 

/**
 * Authenticates the user to update verified status.
 */
export const canUpdateUserVerified = (user) => (
    user.role === roles.ADMIN
); 
