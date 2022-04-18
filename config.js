import dotenv from 'dotenv';
import { assert } from './utils.js';

dotenv.config();

// Configure all the environment variables here and
// export them as JS constants.

assert(process.env.GCP_API_KEY !== undefined, 'Environment variable GCP_API_KEY must be set.');
assert(
  process.env.MONGO_CONNECTION_STRING !== undefined,
  'Environment variable MONGO_CONNECTION_STRING must be set.',
);

export const { GCP_API_KEY } = process.env;
export const { MONGO_CONNECTION_STRING } = process.env;
