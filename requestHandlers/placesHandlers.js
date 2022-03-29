import getPlaceDetails from '../client/placesClient.js';

// TODO: edit
const placeDetailsHandler = async placeId => {
  const clientResponse = await getPlaceDetails(placeId);

  return clientResponse;
};

export default placeDetailsHandler;
