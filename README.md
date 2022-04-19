# Almost Somewhere

AlmostSomewhere helps you explore exciting events and places around you!

## Environment Variables

### Google Cloud Platform

Steps to enable necessary APIs and retrieve the API key:

1. Go to [Cloud Console](https://console.cloud.google.com/) and create a new project.
2. From the sidebar, navigate to `APIs & Services -> Library`.
3. Enable the Google Places API
4. From the sidebar, navigate to `APIs & Services -> Credentials`.
5. Find the option to `Create Credentials` from the top nav bar.
6. Once the API key is generated, copy the key.

Sample `.env` file:

```
GCP_API_KEY=your_google_cloud_api_key
MONGO_CONNECTION_STRING=mongodb_connection_string
JWT_SECRET=superSecret_string_to_sign_jwts
```

## Running Locally

Make sure you have all the environment variables set up.

- Install the necessary dependancies by running `npm install` in the directory containing
  `package.json`.
- To start the development server, run `npm start`.
