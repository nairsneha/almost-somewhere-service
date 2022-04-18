import { StatusCodes } from 'http-status-codes';
import {
  placeDetailsHandler,
  placePhotoHandler,
  placesNearbyHandler,
} from '../requestHandlers/placesHandlers.js';

/**
 * This method handles the get request with the given URL and the parameters mentioned in the
 * request query params
 */
const getNearbyPlaces = async (req, res) => {
  const { longitude, latitude, type, radius } = req.query;
  try {
    const response = await placesNearbyHandler(longitude, latitude, type, radius);
    res.status(StatusCodes.OK).json(response);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message || 'Internal server error' });
  }
};

/**
 * Get the photo from Google Places API given the photo_reference and maxheight or maxwidth.
 *
 * Takes the following as query params:
 * - `photo_reference`: string identifier that uniquely identifies a photo.
 * - `maxheight`: Specifies the maximum desired height or width, in pixels.
 * - `maxwidth`: Specifies the maximum desired height or width, in pixels.
 */
const getPlacePhoto = async (req, res) => {
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
};

/**
 * Get the details for the place specified by the placeId.
 *
 * Takes the `placeId` in request params.
 */
const getPlaceDetails = async (req, res) => {
  try {
    const response = await placeDetailsHandler(req.params?.placeId);
    res.status(StatusCodes.OK).json(response);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || 'Internal server error',
    });
  }
};

/**
 * Controller for /places. Adds all the necessary routes related to dealing with
 * the Google Places API to the `app`.
 * @param {Express} app the express app to add the routes to
 */
const placesController = app => {
  app.get('/places/nearby', getNearbyPlaces);
  app.get('/places/photo', getPlacePhoto);
  app.get('/places/details/:placeId', getPlaceDetails);
};

export default placesController;
