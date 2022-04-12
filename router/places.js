import { StatusCodes } from 'http-status-codes';

import placeDetailsHandler from '../requestHandlers/placesHandlers.js';
import fetch from "node-fetch";
import axios from 'axios';
import { placeDetailsHandler, placePhotoHandler } from '../requestHandlers/placesHandlers.js';

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
        message: err.message || 'Internal server error',
      });
    }
  });

  // Get the photo from Google Places API given the photo_reference and maxheight or maxwidth
  app.get('/places/photo', async (req, res) => {
    const { photo_reference: photoReference, maxheight: maxHeight, maxwidth: maxWidth } = req.query;

    // This request's GET URL can be directly def to <img>'s `src`.
    try {
      const response = await placePhotoHandler(photoReference, maxHeight, maxWidth);
      res.set({
        'content-type': response.headers['content-type'], // Get the type of this image
      });
      res.status(StatusCodes.OK).send(response.data);
    } catch (err) {
      // The client may return an HTTP 400 or 403. See : https://developers.google.com/maps/documentation/places/web-service/photos#place_photo_response
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message || 'Internal server error',
      });
    }
  });


};

export default addPlacesRoutes;
