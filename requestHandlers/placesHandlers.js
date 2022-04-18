import { getPlaceDetails, placesNearbyClient, getPlacePhoto } from '../client/placesClient.js';
import Response from '../dtos/Response.js';
import PlaceDetails from '../dtos/PlaceDetails.js';

/**
 * Helper method to parse the result object from the Places Details API and extracts useful information.
 *
 * Type reference for `result`: https://developers.google.com/maps/documentation/places/web-service/details#Place
 * @param {Place} result The result from Place Details API.
 * @returns {PlaceDetails} parsed details of the given place.
 */
const parsePlaceDetails = result => {
  const placeDetailsBuilder = PlaceDetails.getBuilder();

  const {
    business_status: businessStatus,
    formatted_address: formattedAddress,
    formatted_phone_number: formattedPhoneNumber,
    geometry,
    name,
    opening_hours: openingHours,
    photos: resultPhotos,
    place_id: placeId,
    rating,
    reviews: resultReviews,
    website,
  } = result;

  placeDetailsBuilder.businessStatus = businessStatus;
  placeDetailsBuilder.formattedAddress = formattedAddress;
  placeDetailsBuilder.formattedPhoneNumber = formattedPhoneNumber;
  placeDetailsBuilder.name = name;
  placeDetailsBuilder.placeId = placeId;
  placeDetailsBuilder.rating = rating;
  placeDetailsBuilder.website = website;

  const { location } = geometry;
  placeDetailsBuilder.location = location;

  const { open_now: openNow, weekday_text: weekdayText } = openingHours;

  placeDetailsBuilder.openNow = openNow;
  placeDetailsBuilder.weekdayText = weekdayText;

  if (resultPhotos && resultPhotos.length > 0) {
    const photos = resultPhotos.map(resultPhoto => {
      const { height, width, photo_reference: photoReference } = resultPhoto;

      return { height, width, photoReference };
    });

    photos.forEach(photo => placeDetailsBuilder.addPhoto(photo));
  }

  if (resultReviews && resultReviews.length > 0) {
    const reviews = resultReviews.map(resultReview => {
      const {
        author_name: authorName,
        profile_photo_url: profilePhotoUrl,
        rating: reviewRating,
        relative_time_descrption: relativeTimeDescription,
        text,
      } = resultReview;

      return {
        authorName,
        profilePhotoUrl,
        rating: reviewRating,
        relativeTimeDescription,
        text,
      };
    });

    reviews.forEach(review => placeDetailsBuilder.addReview(review));
  }

  return placeDetailsBuilder.build();
};

/**
 * Gets the necessary information regarding the place specified by the
 * `placeId`.
 *
 * @param {string} placeId `place_id` of the place as obtained from Google.
 * @returns {Promise<Response>} a {@link Response} with {@link PlaceDetails} as response if there exists a valid place with the
 * given `placeId`.
 */
export const placeDetailsHandler = async placeId => {
  const response = await getPlaceDetails(placeId);

  const placesDetails = response.isOk ? parsePlaceDetails(response.response) : {};

  return new Response(response.isOk, response.message, placesDetails);
};

/**
 * Gets the nearby locations mentioned in type of place specified by the
 * longitude, latitude, radius.
 *
 * @param {String} longitude longitude for which we need to fetch the nearby places
 * @param {String} latitude latitude for which we need to fetch the nearby places
 * @param {String} type type of places to be retrieved
 * @param {Number} radius the radius in which we are fetching the nearby
 * @returns {Promise<Response>} a {@link Response} with {@link placesNearby} as response if there
 * exists a valid place with the given parameters.
 */

export const placesNearbyHandler = async (longitude, latitude, type, radius) => {
  const response = await placesNearbyClient(longitude, latitude, type, radius);
  const placesNearby = response.isOk ? response.response : {};

  return new Response(response.isOk, response.message, placesNearby);
};

/**
 *  Gets the photo (in the form of an arraybuffer (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data)) of the
 * place with the given `photoReference` from Google.
 *  The response's content type is 'image/jpeg'.
 *
 * Reference: Google's own JS wrapper around the Places API - https://github.com/googlemaps/google-maps-services-js/blob/master/src/places/photo.ts
 *
 * @param {string} photoReference string identifier that uniquely identifies a photo. Photo references are returned from either a Place Search or Place Details request.
 * @param {integer} maxHeight Specifies the maximum desired height or width, in pixels, of the image returned by the Place Photos service. If the image is smaller than the values specified, the original image will be returned. If the image is larger in either dimension, it will be scaled to match the smaller of the two dimensions, restricted to its original aspect ratio. Both the `maxheight` and `maxwidth` properties accept an integer between 1 and 1600.
 * @param {integer} maxWidth  Specifies the maximum desired height or width, in pixels, of the image returned by the Place Photos service. If the image is smaller than the values specified, the original image will be returned. If the image is larger in either dimension, it will be scaled to match the smaller of the two dimensions, restricted to its original aspect ratio. Both the `maxheight` and `maxwidth` properties accept an integer between 1 and 1600.
 * @returns the `response` from Google Places API / Photo. The `response.headers['content-type']` contains the type of the image that is returned, and `response.data` contains the actual image in the form of an arraybuffer.
 */
export const placePhotoHandler = async (photoReference, maxHeight, maxWidth) => {
  const response = await getPlacePhoto(photoReference, maxHeight, maxWidth);

  // We're directly returning the response because the data from the response is in Binary form. We will also need the response's header data to
  // return our own response.
  return response;
};
