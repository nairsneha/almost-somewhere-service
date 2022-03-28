/**
 * Represents a response obtained by making a request to the API clients.
 * Contains information regarding whether the request was successfull,
 * an infromative message, and the actual API response body.
 */
class ClientResponse {
  #isOk;

  #message;

  #response;

  constructor(isOk = false, message = '', response = {}) {
    this.#isOk = isOk;
    this.#message = message;
    this.#response = response;
  }

  get isOk() {
    return this.#isOk;
  }

  get message() {
    return this.#message;
  }

  get response() {
    return { ...this.#response };
  }

  get clientResponse() {
    return {
      isOk: this.#isOk,
      message: this.#message,
      response: { ...this.#response },
    };
  }
}

export default ClientResponse;
