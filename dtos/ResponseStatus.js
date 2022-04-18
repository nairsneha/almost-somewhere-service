import Response from './Response';

/**
 * Represents a response obtained by making a request.
 * Contains information regarding whether the request was successful,
 * an informative message, the HTTP status code, and the actual response body.
 */
class ResponseStatus extends Response {
  #status;

  /**
   * Creates a new `Response` with the given data.
   *
   * @param {boolean} isOk whether the request was successfully processed
   * @param {string} message an informative message associated with the given response
   * @param {object} response body of the response
   * @param {number} status HTTP status code associated with this request
   */
  constructor(isOk, message, response, status = 200) {
    super(isOk, message, response);
    this.#status = status;
  }

  get status() {
    return this.#status;
  }

  toJSON() {
    return { ...super.toJSON(), status: this.#status };
  }
}

export default ResponseStatus;
