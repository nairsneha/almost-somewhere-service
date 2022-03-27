import express from 'express';
import CORS from 'cors';
import volleyball from 'volleyball';
import addAllRoutes from './router/index.js';

const app = express();

app.use(express.json());

// A basic middleware to log requests: https://www.npmjs.com/package/volleyball
app.use(volleyball);

app.use(CORS());

addAllRoutes(app);

const port = process.env.PORT || 8081;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Up and Running at http://localhost:${port}`);
});
