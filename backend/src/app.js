// initialize express
// register middleware
// define routes
// global error handling


import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
// import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

import config from './config/env.js';
import corsOptions from './config/corsOptions.js';

// import routers
import authRouter from './routes/auth.routes.js';
import postRouter from './routes/post.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();

// register middleware

app.use(helmet()); // sets HTTP headers to secure the app
app.use(morgan("dev")); // log HTTP requests to the console
app.use(cors(corsOptions)); // allows requests from the React frontend and requests with no origin to send HTTP requests


const isAuthRateLimitedRoute = (req) =>
    req.method === 'POST' &&
    (req.path === '/auth/login' || req.path === '/auth/register');

const hasNonEmptyString = (value) =>
    typeof value === 'string' && value.trim().length > 0;

const getKeyword = (req) => {
    if (hasNonEmptyString(req.query.keyword)) return req.query.keyword.trim();
    if (hasNonEmptyString(req.query.search)) return req.query.search.trim();
    return '';
};

const hasTagFilter = (tags) =>
    Array.isArray(tags)
        ? tags.some((tag) => hasNonEmptyString(tag))
        : hasNonEmptyString(tags);

const isSearchRateLimitedRoute = (req) =>
    req.method === 'GET' &&
    req.path === '/posts' &&
    (getKeyword(req).length > 0 || hasTagFilter(req.query.tags));

// set this before rate limiting so req.ip can use forwarded client IPs behind proxies (e.g., Render).
app.set('trust proxy', config.trustProxy ? 1 : false);


// use Redis for multi-server deployments
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: config.rateLimitGlobalMax,
    message: {
        success: false,
        message: "Too many API requests, please try again later.",
    },
    // prevent double counting for requests already protected by auth/search limiter
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => isAuthRateLimitedRoute(req) || isSearchRateLimitedRoute(req),
});


app.use("/api", globalLimiter);


app.use(express.json()); // parse incoming JSON payloads
app.use(express.urlencoded( { extended: true } )); // parse data sent via standard HTML forms
app.use(cookieParser()); // read secure HTTP-only coookie containing a user's JWT via req.cookies
//app.use(mongoSanitize()); // prevent MongoDB Operator Injection
// TODO: Fix TypeError conflict with Express version

// define routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter); // commentRouter is encapsulated in the postRouter
app.use('/api/users', userRouter);

// add error middleware
app.use((err, _req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err.stack : null,
    });
});

// status check
app.get('/', (_req, res) => {
    res.status(200).json({
        message: "Welcome to the Phantom Aficionado Forum"
    });
});

export default app;
