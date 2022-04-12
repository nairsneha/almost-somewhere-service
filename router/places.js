import { StatusCodes } from 'http-status-codes';
import {placeDetailsHandler} from '../requestHandlers/placesHandlers.js';
import fetch from "node-fetch";
import axios from 'axios';
/**
 * Adds all the necessary routes related to dealing with
 * the Google Places API to the `app`.
 * @param {Express} app the express app to add the routes to
 */

const addPlacesRoutes = app => {
  // Get the details for the place specified by the placeId
  app.get('/places/details/:placeId', async (req, res) => {
    try {
      const response = await placeDetailsHandler(req.params?.placeId);
      res.status(StatusCodes.OK).json(response);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  });


};

export default addPlacesRoutes;
