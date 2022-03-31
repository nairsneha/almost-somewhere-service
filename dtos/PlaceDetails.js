import { assert } from '../utils.js';
// eslint-disable-next-line import/no-cycle
import PlaceDetailsBuilder from './PlaceDetailsBuilder.js';

/**
 * Contains different details regarding a place (business/establishment) on Google Maps.
 * These details include name, geographical location, phone number, address, reviews,
 * pictures, etc.
 */
class PlaceDetails {
  #placeId;

  #businessStatus;

  #formattedAddress;

  #formattedPhoneNumber;

  #location;

  #openNow;

  #weekdayText;

  #photos;

  #rating;

  #reviews;

  #name;

  #website;

  /**
   * Creates a new PlaceDetails instance that contains various informtion regarding the place like
   * name, location, opening hours, etc.
   *
   * @param {string} placeId id of the place
   * @param {string} name name of the establishment
   * @param {PlaceLocation} location location (lat, lng) of the establishment
   * @param {string} businessStatus status of this business's operations
   * @param {string} formattedAddress the formatted address of this place
   * @param {string} formattedPhoneNumber phone number
   * @param {boolean} openNow whether the place is open right now
   * @param {string[]} weekdayText information regarding the time of operations
   * @param {Photo[]} photos an array of photos of this place
   * @param {number} rating overall rating of the business
   * @param {Review[]} reviews an array of user reviews of the establishment
   * @param {string} website the business's website
   */
  constructor(
    placeId,
    name,
    location,
    businessStatus,
    formattedAddress,
    formattedPhoneNumber,
    openNow,
    weekdayText,
    photos,
    rating,
    reviews,
    website,
  ) {
    assert(placeId, 'place_id must be defined.');
    this.#placeId = placeId;
    this.#name = name || '';
    this.#location = location || { lat: 0, lng: 0 };
    this.#businessStatus = businessStatus || '';
    this.#formattedAddress = formattedAddress || '';
    this.#formattedPhoneNumber = formattedPhoneNumber || '';
    this.#openNow = openNow || false;
    this.#weekdayText = weekdayText || [];
    this.#photos = photos || [];
    this.#rating = rating || 0;
    this.#reviews = reviews || [];
    this.#website = website || '';
  }

  /**
   * Returns the serialized version of the place details.
   *
   * @returns {PlaceDetail} details of the place
   */
  toJSON() {
    return {
      placeId: this.#placeId,
      name: this.#name,
      location: this.#location,
      business_status: this.#businessStatus,
      formatted_address: this.#formattedAddress,
      formatted_phone_number: this.#formattedPhoneNumber,
      open_now: this.#openNow,
      weekday_text: this.#weekdayText,
      photos: this.#photos,
      rating: this.#rating,
      reviews: this.#reviews,
      website: this.#website,
    };
  }

  /**
   * @returns {PlaceDetailsBuilder} a new builder for PlaceDetails
   */
  static getBuilder() {
    return new PlaceDetailsBuilder();
  }
}

/**
 * @typedef {object} PlaceLocation - Represents a geographical location with a lat and lng
 * @property {float} lat - Latitude of the given geographical location
 * @property {float} lng - longitude of the given geographical location
 */

/**
 * @typedef {object} Photo - Represents a Photo element from the places response.
 * @property {string} photo_reference - a string used to identify the photo when you perform a Photo request
 * @property {number} height - max height of the image
 * @property {number} width - max width of the image
 */

/**
 * @typedef {object} Review - Represents a review of a place posted on google.
 * @property {string} author_name - Name of the author of the review
 * @property {string} profile_photo_url - URL of the author's profile picture.
 * @property {number} rating - Rating the reviewer gave to this place
 * @property {string} relative_time_description - how long ago was this review posted in relative time e.g 'a week ago'
 * @property {string} text - text of review
 */

/**
 * @typedef {object} PlaceDetail
 * @property {string} place_id id of the place
 * @property {string} name name of the establishment
 * @property {Location} location location (lat, lng) of the establishment
 * @property {string} business_status status of this business's operations
 * @property {string} formatted_address the formatted address of this place
 * @property {string} formatted_phone_number phone number
 * @property {boolean} open_now whether the place is open right now
 * @property {string[]} weekday_text information regarding the time of operations
 * @property {Photo[]} photos an array of photos of this place
 * @property {number} rating overall rating of the business
 * @property {Review[]} reviews an array of user reviews of the establishment
 * @property {string} website the business's website
 */

export default PlaceDetails;
