import axios from 'axios';
import { GCP_API_KEY } from '../config.js';
import Response from '../dtos/Response.js';
import { assert } from '../utils.js';

// Add all the calls to Places Search API here

// `placesInstance` is an Axios Instance (https://axios-http.com/docs/instance).
// With this instance, the query parameter 'key' will be automatically appended at the end
// of our requests. We will not need to specify the 'key' seperately everytime.
//  e.g placesInstance.get("/"), will make GET request to 'https://maps.googleapis.com/maps/api/place?key=`GCP_API_KEY`'
const placesInstance = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place',
  params: {
    key: GCP_API_KEY,
  },
});

// All the possible response statuses from Places/Details API
// https://developers.google.com/maps/documentation/places/web-service/details#PlacesDetailsStatus
const placesDetailsStatuses = new Map();
placesDetailsStatuses.set('OK', 'Details of the place successfully returned.');
placesDetailsStatuses.set('ZERO_RESULTS', 'The establishment is no longer a business.');
placesDetailsStatuses.set('NOT_FOUND', "Couldn't find a place with the given id!");
placesDetailsStatuses.set('INVALID_REQUEST', 'The request was malformed!');
placesDetailsStatuses.set('OVER_QUERY_LIMIT', 'Exceeded query limit.');
placesDetailsStatuses.set('REQUEST_DENIED', 'Problem with the API key.');
placesDetailsStatuses.set('UNKNOWN_ERROR', 'An unknown error occurred!');

/**
 * Requests the Google Places API to get the details
 * of the place specified by the given `placeId`.
 * Docs: https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsResponses
 *
 * @param {string} placeId Google Place's `place_id` for which the details are to be fetched.
 * @returns {Response} the response data
 */
export const getPlaceDetails = async placeId => {
  assert(placeId && typeof placeId === typeof 'somestring', 'placeId must be valid');

  const response = await placesInstance.get(`/details/json`, {
    params: {
      place_id: placeId,
    },
  });

  const isOk = response?.data?.status === 'OK';
  const message = placesDetailsStatuses.get(response?.data?.status) || 'An unknown error occured!';
  const data = response?.data?.result;

  const res = new Response(isOk, message, data);
  return res;
};

/**
<<<<<<< HEAD
 * Requests the Google Places API to get the nearby places
 * of the place specified by the given latitude, longitude in a radius of 'radius' and the type of
 * locations mentioned in 'type'.
 * example: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=42.3417141,-71.0856371&radius=5000&type=gym|movie_theater|university&key=AIzaSyDW7vVFZuiP2LR320PUxuHjjVqmZ0ogF7o'
 *
 * @param {String} longitude longitude for which we need to fetch the nearby places
 * @param {String} latitude latitude for which we need to fetch the nearby places
 * @param {String} type type of places to be retrieved
 * @param {Number} radius the radius in which we are fetching the nearby
 */

export const placesNearbyClient = async (longitude, latitude, type, radius) => {
  assert(longitude && typeof longitude === typeof 'somestring', 'longitude must be valid');
  assert(latitude && typeof latitude === typeof 'somestring', 'latitude must be valid');
  assert(type && typeof type === typeof 'somestring', 'type must be valid');
  // assert(typeof radius === typeof 12, 'radius must be valid');

  const response = await placesInstance.get(`/nearbysearch/json`, {
    params: {
      location: `${longitude},${latitude}`,
      type: type,
      radius: radius
    },
  });

  const isOk = response?.data?.status === 'OK';
  // const message = placesDetailsStatuses.get(response?.data?.status) || 'An unknown error occured!';
  const message = 'info retrieved';
  const data = response?.data;

  const res = new Response(isOk, message, data);
  return res;
}


=======
 *  Gets the photo (in the form of an arraybuffer (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data)) of the
 * place with the given `photoReference` from Google.
 *  The response's content type is 'image/jpeg'.
 *
 * Reference: Google's own JS wrapper around the Places API - https://github.com/googlemaps/google-maps-services-js/blob/master/src/places/photo.ts
 *
 * @param {string} photoReference string identifier that uniquely identifies a photo. Photo references are returned from either a Place Search or Place Details request.
 * @param {integer} maxHeight Specifies the maximum desired height or width, in pixels, of the image returned by the Place Photos service. If the image is smaller than the values specified, the original image will be returned. If the image is larger in either dimension, it will be scaled to match the smaller of the two dimensions, restricted to its original aspect ratio. Both the `maxheight` and `maxwidth` properties accept an integer between 1 and 1600.
 * @param {integer} maxWidth  Specifies the maximum desired height or width, in pixels, of the image returned by the Place Photos service. If the image is smaller than the values specified, the original image will be returned. If the image is larger in either dimension, it will be scaled to match the smaller of the two dimensions, restricted to its original aspect ratio. Both the `maxheight` and `maxwidth` properties accept an integer between 1 and 1600.
 * @returns the `response` from Google Places API / Photo. The `response.headers['content-type']` contains the type of the image that is returned, and `response.data` contains the actual image in the form of an arraybuffer. Throws an HTTP 400 if there's a problem with the request (See: https://developers.google.com/maps/documentation/places/web-service/photos#place_photo_response)
 */
export const getPlacePhoto = async (photoReference, maxHeight, maxWidth) => {
  assert(maxHeight || maxWidth, 'maxheight or maxwidth must be specified.');
  const response = await placesInstance.get('/photo', {
    params: {
      photo_reference: photoReference,
      maxheight: maxHeight,
      maxwidth: maxWidth,
    },
    responseType: 'arraybuffer', // Asks the server to return binary data (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data)
  });

  return response;
};
>>>>>>> e7a0b08137715e94c948d459ea4022abeada9f23
