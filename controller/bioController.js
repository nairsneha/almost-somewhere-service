import {getBioHandler,createBioHandler,updateBioHandler} from "../requestHandlers/bioHandlers.js";
import {authenticate} from "../middlewares/authMiddlewares.js";
import {StatusCodes} from "http-status-codes";

/**
 * Retrieves the bio of the user with the given unique username.
 */
const getBio = async (req, res) => {
    try {
        const response = await getBioHandler(req.params.username);
        res.status(response.status || StatusCodes.OK).json(response);
    }
    catch (err) {

        res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: err.message || 'User not authenticated' });
    }


}

/**
 * Creates a bio for the user with the given username since its unique
 * It adds details of user like firstname, lastname, gender, age, favorites, followers, following
 * @param req the http request from the client
 * @param res the http response sent to client
 */
const createBio = async (req, res) => {

   try {
        const response = await createBioHandler(req.body);
        res.status(response.status || StatusCodes.OK).json(response);
    }
    catch (err) {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: err.message || 'User not authenticated' });
    }

}
/**
 * Updates the bio of the user with new details with given username
 * @param req the http request from the client
 * @param res the http response sent to client
 */
const updateBio = async (req, res) => {

    try {
        const response = await updateBioHandler(req.body);
        res.status(response.status || StatusCodes.OK).json(response);
    }
    catch (err) {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: err.message || 'User not authenticated' });
    }

}

/**
 * Controller for /auth. Adds all the necessary routes related to authentication to the app.
 * @param app {Express} app the express app to add the routes to
 */
const bioController = app => {
    app.get('/username/:username/bio',authenticate, getBio);
    app.post('/bio', createBio);
    app.put('/bio',authenticate, updateBio);
};

export default bioController;