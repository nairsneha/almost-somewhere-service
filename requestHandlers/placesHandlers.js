import getPlaceDetails from '../client/placesClient.js';
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
 * Gets the necessary information regaring the place specified by the
 * `placeId`.
 *
 * @param {string} placeId `place_id` of the place as obtained from Google.
 * @returns {Promise<Response>} a {@link Response} with {@link PlaceDetails} as response if there exists a valid place with the
 * given `placeId`.
 */
const placeDetailsHandler = async placeId => {
  const response = await getPlaceDetails(placeId);

  const placesDetails = response.isOk ? parsePlaceDetails(response.response) : {};

  return new Response(response.isOk, response.message, placesDetails);
};

// TODO: convert default export to named export when we export more functions from this file.
export default placeDetailsHandler;
