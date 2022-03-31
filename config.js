import dotenv from 'dotenv';
import { assert } from './utils.js';

dotenv.config();

// Configure all the environment variables here and
// export them as JS constants.

assert(process.env.GCP_API_KEY !== undefined, 'Environment variable GCP_API_KEY must be set.');

// TODO: Remove eslint-disable statement after we export more things from this file.
// eslint-disable-next-line import/prefer-default-export
export const { GCP_API_KEY } = process.env;
