import {StatusCodes} from "http-status-codes";
import placesNearbyHandler from "../requestHandlers/placesNearbyHandler.js";

/**
 * This method handles the get request with the given URL and the parameters mentioned in the
 * request query params
 * @param app the express app for which this is the controller
 */

const getNearbyPlaces = (app) => {

    app.get('/places/nearby', async (req, res) => {
        const {longitude, latitude, type, radius} = req.query;
        try {
            const response = await placesNearbyHandler(longitude, latitude, type, radius);
            res.status(StatusCodes.OK).json(response);
        }
        catch(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                                                                   message: 'Internal server error',
                                                               });}
    });

}
export default getNearbyPlaces