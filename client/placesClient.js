import axios from 'axios';
import { GCP_API_KEY } from '../config';

// Add all the calls to Placces Search API here

// placesInstance is an Axios Instance (https://axios-http.com/docs/instance).
// With this instance, the query parameter 'key' will be automatically appended at the end
// of our requests. We will not need to specify the 'key' seperately everytime.
//  e.g placesInstance.get("/"), will make GET request to 'https://maps.googleapis.com/maps/api/place?key=`GCP_API_KEY`'
// TODO: remove eslint-disable line after placesInstance is used.
// eslint-disable-next-line no-unused-vars
const placesInstance = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place',
  params: {
    key: GCP_API_KEY,
  },
});
