/**
 *  Checks the truthfullness of the given `condition` and throws an `Error` with the
 *  given `message` if the assertion fails (i.e if the given `condition` is false).
 * @param {boolean} condition the condition to be checked
 * @param {string} message the error message to be thrown if the assertion fails
 */
export const assert = (condition, message) => {
  //Reference: https://stackoverflow.com/a/17370169/11844726
  if (!condition) {
    throw Error(`Assert failed: ${message || ""}`);
  }
};
