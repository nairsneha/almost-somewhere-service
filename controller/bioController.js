import {getBioHandler,createBioHandler,updateBioHandler} from "../requestHandlers/bioHandlers.js";
import authenticate from "../middlewares/authMiddlewares.js";
import {StatusCodes} from "http-status-codes";

const getBio = async (req, res, next) => {
    try {
       // authenticate(req, res, next);
        const response = await getBioHandler(req.params.username);
        res.status(response.status || StatusCodes.OK).json(response);
    }
    catch (err) {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: err.message || 'User not authenticated' });
    }


}

const createBio = async (req, res, next) => {

   try {
       // authenticate(req, res, next);
        const response = await createBioHandler(req.body);
        res.status(response.status || StatusCodes.OK).json(response);
    }
    catch (err) {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: err.message || 'User not authenticated' });
    }

}

const updateBio = async (req, res, next) => {

    try {
        // authenticate(req, res, next);
        const response = await updateBioHandler(req.body);
        res.status(response.status || StatusCodes.OK).json(response);
    }
    catch (err) {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: err.message || 'User not authenticated' });
    }

}

const bioController = app => {
    app.get('/username/:username/bio', getBio);
    app.post('/bio', createBio);
    app.put('/bio', updateBio);
};

export default bioController;