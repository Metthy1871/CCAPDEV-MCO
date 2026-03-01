// initialize express
// register middleware
// define routes
// global error handling


import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
// import rateLimit from 'express-rate-limit';


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

// add rate limiter here

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
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err.stack : null,
    });
})

// status check
app.get('/', (_req, res) => {
    res.status(200).json({
        message: "Welcome to the Phantom Aficionado Forum"
    });
});

export default app;
