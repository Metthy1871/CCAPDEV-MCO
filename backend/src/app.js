// initialize express
// register middleware
// define routes
// global error handling


// helmet, express-mongo-sanitize, express-rate-limit, morgan

import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json()); // parse incoming JSON payloads
app.use(express.urlencoded( { extended: false } )); // parss


export default app;
