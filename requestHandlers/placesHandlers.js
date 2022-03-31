import getPlaceDetails from '../client/placesClient.js';
import ClientResponse from '../dtos/ClientResponse.js';
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
      // Silly snake_case -> camelCase and camelCase -> snake_case conversion to satisfy the linter.
      const { height, width, photo_reference: photoReference } = resultPhoto;

      return { height, width, photo_reference: photoReference };
    });

    photos.forEach(photo => placeDetailsBuilder.addPhoto(photo));
  }

  if (resultReviews && resultReviews.length > 0) {
    // Silly snake_case -> camelCase and camelCase -> snake_case conversion to satisfy the linter.
    const reviews = resultReviews.map(resultReview => {
      const {
        author_name: authorName,
        profile_photo_url: profilePhotoUrl,
        rating: reviewRating,
        relative_time_descrption: relativeTimeDescription,
        text,
      } = resultReview;

      return {
        author_name: authorName,
        profile_photo_url: profilePhotoUrl,
        rating: reviewRating,
        relative_time_descrption: relativeTimeDescription,
        text,
      };
    });

    reviews.forEach(review => placeDetailsBuilder.addReview(review));
  }

  return placeDetailsBuilder.build();
};

// TODO: edit
const placeDetailsHandler = async placeId => {
  const clientResponse = await getPlaceDetails(placeId);

  const placesDetails = clientResponse.isOk ? parsePlaceDetails(clientResponse.response) : {};

  return new ClientResponse(clientResponse.isOk, clientResponse.message, placesDetails);
};

export default placeDetailsHandler;
