import express from 'express';
import CORS from 'cors';
import volleyball from 'volleyball';
import mongoose from 'mongoose';
import placesController from './controller/placesController.js';
import { MONGO_CONNECTION_STRING } from './config.js';
import authController from './controller/authController.js';
import bioController from "./controller/bioController.js";
import reviewController from "./controller/reviewController.js"

// Connect to the AlmostSomewhere database
mongoose.connect(MONGO_CONNECTION_STRING);

const app = express();

app.use(express.json());

// A basic middleware to log requests: https://www.npmjs.com/package/volleyball
app.use(volleyball);

app.use(CORS());

placesController(app);
authController(app);
bioController(app);
reviewController(app);

const port = process.env.PORT || 8081;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Up and Running at http://localhost:${port}`);
});
