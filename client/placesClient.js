import axios from 'axios';
import { GCP_API_KEY } from '../config';
import ClientResponse from './clientResponse';

// Add all the calls to Placces Search API here

// placesInstance is an Axios Instance (https://axios-http.com/docs/instance).
// With this instance, the query parameter 'key' will be automatically appended at the end
// of our requests. We will not need to specify the 'key' seperately everytime.
//  e.g placesInstance.get("/"), will make GET request to 'https://maps.googleapis.com/maps/api/place?key=`GCP_API_KEY`'
// TODO: remove eslint-disable line after placesInstance is used.
// eslint-disable-next-line no-unused-vars
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
placesDetailsStatuses.set('UNKNOWN_ERROR', 'An unknown error occured!');

/**
 * Requests the Google Places API to get the details
 * of the place specified by the given `placeId`.
 * Docs: https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsResponses
 *
 * @param {string} placeId Google Place's `place_id` for which the details are to be fetched.
 * @returns {ClientResponse} the response data
 */
const getPlaceDetails = async placeId => {
  const response = await placesInstance.get(`/details/json`, {
    params: {
      place_id: placeId,
    },
  });

  const isOk = response?.data?.status === 'OK';
  const message = placesDetailsStatuses.get(response?.data?.status) || 'An unknown error occured!';
  const { data } = response;

  const res = new ClientResponse(isOk, message, data);
  return res;
};

export default getPlaceDetails;
