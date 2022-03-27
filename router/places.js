/**
 * Adds all the necessary routes related to dealing with
 * the Google Places API to the `app`.
 * @param {Express} app the express app to add the routes to
 */
const addPlacesRoutes = (app) => {
  //! TODO: Remove this route
  /**
   * Hello world route for sanity check.
   */
  app.get("/places", async (req, res) => {
    return res.json({ message: "Hello World" });
  });
};

export default addPlacesRoutes;
