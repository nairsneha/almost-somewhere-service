import { StatusCodes } from 'http-status-codes';
import placeDetailsHandler from '../requestHandlers/placesHandlers.js';

/**
 * Adds all the necessary routes related to dealing with
 * the Google Places API to the `app`.
 * @param {Express} app the express app to add the routes to
 */
const addPlacesRoutes = app => {
  //! TODO: Remove this route
  /**
   * Hello world route for sanity check.
   */
  app.get('/places', async (req, res) => res.json({ message: 'Hello World' }));

  app.get('/places/details/:placeId', async (req, res) => {
    try {
      const response = await placeDetailsHandler(req.params.placeId);
      res.status(StatusCodes.OK).json(response.clientResponse);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  });
};

export default addPlacesRoutes;
