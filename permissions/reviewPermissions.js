import roles from '../roles.js';

export const canDelAnyReview = (user) => (
        user.role === roles.ADMIN || user.role === roles.MOD
    ); 

export const canCreateUpdateDeleteReview = (user, givenUser) => (
    user.username === givenUser
); 
