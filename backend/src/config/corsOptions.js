// Source: https://www.stackhawk.com/blog/nodejs-cors-guide-what-it-is-and-how-to-enable-it/
// Adapted to configure CORS and enable the frontend to make requests to the backend API

const allowedOrigins = [
    'http://localhost:5173', // React Frontend
];


// allows requests from no origins, such as from testing software like Postman
// the backend will accept cookies and authentication info from the frontend
// allows the frontend to send Content-Type and Authorization

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // allow the request

        if (allowedOrigins.includes(origin)) {
            callback(null, true); // allow the request
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}


export default corsOptions;
