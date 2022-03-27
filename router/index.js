import addPlacesRoutes from "./places.js";

/**
 * Adds all the necessary routes to the `app`.
 * @param {Express} app the express app to add the routes to
 */
const addAllRoutes = (app) => {
  addPlacesRoutes(app);
};

export default addAllRoutes;
