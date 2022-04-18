import express from 'express';
import CORS from 'cors';
import volleyball from 'volleyball';
import placesController from './controller/placesController.js';

const app = express();

app.use(express.json());

// A basic middleware to log requests: https://www.npmjs.com/package/volleyball
app.use(volleyball);

app.use(CORS());

placesController(app);

const port = process.env.PORT || 8081;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Up and Running at http://localhost:${port}`);
});
