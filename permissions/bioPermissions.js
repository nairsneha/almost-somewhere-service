import roles from "../roles.js";

export const canViewBio = (user, bioUsername) => (user.username === bioUsername)

export const canUpdateBio = (user, bioUsername) => (
    user.username === bioUsername || user.role === roles.ADMIN
); 

export const canUpdateUserVerified = (user) => (
    user.role === roles.ADMIN
); 
