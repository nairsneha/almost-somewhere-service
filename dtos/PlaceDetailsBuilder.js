// eslint-disable-next-line import/no-cycle
import PlaceDetails from './PlaceDetails.js';

/**
 * Represents a builder for PlaceDetails. Use the setters to
 * set the properties of this builder and then call build to construct
 * a new PlaceDetails object.
 */
class PlaceDetailsBuilder {
  #placeId;

  #businessStatus;

  #formattedAddress;

  #formattedPhoneNumber;

  #location;

  #openNow;

  #weekdayText;

  #photos = [];

  #rating;

  #reviews = [];

  #name;

  #website;

  /**
   * @param {string} placeId id of the place
   */
  set placeId(placeId) {
    this.#placeId = placeId;
  }

  /**
   * @param {string} name name of the place
   */
  set name(name) {
    this.#name = name;
  }

  /**
   * @param {string} businessStatus status of this business's operations
   */
  set businessStatus(businessStatus) {
    this.#businessStatus = businessStatus;
  }

  /**
   * @param {string} formattedAddress the formatted address of this place
   */
  set formattedAddress(formattedAddress) {
    this.#formattedAddress = formattedAddress;
  }

  /**
   * @param {string} formattedPhoneNumber phone number
   */
  set formattedPhoneNumber(formattedPhoneNumber) {
    this.#formattedPhoneNumber = formattedPhoneNumber;
  }

  /**
   * @param {PlaceLocation} location location (lat, lng) of the establishment
   */
  set location(location) {
    this.#location = location;
  }

  /**
   * @param {boolean} openNow whether the place is open right now
   */
  set openNow(openNow) {
    this.#openNow = openNow;
  }

  /**
   * @param {string[]} weekdayText information regarding the time of operations
   */
  set weekdayText(weekdayText) {
    this.#weekdayText = weekdayText;
  }

  /**
   * Add a photo to the list of pictures of this place.
   * @param {Photo} photo a picture of the place
   */
  addPhoto(photo) {
    this.#photos.push(photo);
  }

  /**
   * @param {number} rating overall rating of the business
   */
  set rating(rating) {
    this.#rating = rating;
  }

  /**
   * Adds a review to the list of reviews of this place.
   * @param {Review} review a user review of this place
   */
  addReview(review) {
    this.#reviews.push(review);
  }

  /**
   * @param {string} website the business's website
   */
  set website(website) {
    this.#website = website;
  }

  /**
   * Builds and returns a new PlacesDetails object based on the informtion
   * provided to this builder.
   * @returns {PlaceDetails} a new PlacesDetails object
   */
  build() {
    return new PlaceDetails(
      this.#placeId,
      this.#name,
      this.#location,
      this.#businessStatus,
      this.#formattedAddress,
      this.#formattedPhoneNumber,
      this.#openNow,
      this.#weekdayText,
      this.#photos,
      this.#rating,
      this.#reviews,
      this.#website,
    );
  }
}

export default PlaceDetailsBuilder;
