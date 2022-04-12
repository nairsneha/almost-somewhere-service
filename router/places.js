import { StatusCodes } from 'http-status-codes';
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

  app.get('/places/photo', async (req, res) => {
    const { photo_reference: photoReference, maxheight: maxHeight, maxwidth: maxWidth } = req.query;

    try {
      const response = await placePhotoHandler(photoReference, maxHeight, maxWidth);
      res.set({
        'content-type': 'image/jpeg',
        'alt-svc': response.headers['alt-svc'],
        'content-disposition': response.headers['content-disposition'],
        'etag': response.headers.etag,
      });
      res.status(StatusCodes.OK).send(response.data);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message || 'Internal server error',
      });
    }
  });
};

export default addPlacesRoutes;
