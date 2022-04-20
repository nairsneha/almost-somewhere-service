import ResponseStatus from '../dtos/ResponseStatus.js';
import bioDao from "../daos/bioDao.js";
import {StatusCodes} from "http-status-codes";

export const getBioHandler = async username => {

    const bioUser = await bioDao.getUserBio(username);

    if (!bioUser) {
        return new ResponseStatus( false,
                                   'This username does not exist',
                                   {},
                                   StatusCodes.UNAUTHORIZED,);
    }

    return new ResponseStatus(true, 'Get Bio', bioUser, StatusCodes.OK);

};


export const createBioHandler = async bio => {

    const userBio = await bioDao.createUserBio(bio);

    if (!userBio) {
        return new ResponseStatus( false,
                                   'Bio could not be created',
                                   {},
                                   StatusCodes.UNAUTHORIZED,);
    }

    return new ResponseStatus(true, 'Bio created', userBio, StatusCodes.OK);
}

export const updateBioHandler = async bio => {

    const userBio = await bioDao.updateUserBio(bio);
    const newBio = await bioDao.getUserBio(bio.username);
    if (!userBio) {
        return new ResponseStatus( false,
                                   'Bio could not be updated',
                                   {},
                                   StatusCodes.UNAUTHORIZED,);
    }

    return new ResponseStatus(true, 'Bio updated', newBio, StatusCodes.OK);
}