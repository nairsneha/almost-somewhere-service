/**
 * @typedef {object} Location - Represents a geographical location with a lat and lng
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
