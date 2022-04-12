import placesNearbyClient from "../client/placesNearbyClient.js";
import Response from "../dtos/Response.js";

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

const placesNearbyHandler = async (longitude, latitude, type, radius) => {
    const response = await placesNearbyClient(longitude, latitude, type, radius);
    const placesNearby = response.isOk ? response.response : {};

    return new Response(response.isOk, response.message, placesNearby);
}

export default placesNearbyHandler