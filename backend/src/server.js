import app from './app.js'; 
import config from './config/env.js';
import connectDB from './config/db.js';


// import app
// connect database
// environment variable checks
// listener
// handling process-level errors


// connect the database before starting the server
const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(config.port,
            console.log(`The Phantom Aficionado Forum is running on http://localhost:${config.port}.`)
        );


        // shut down server if database suddenly disconnects
        process.on('unhandledRejection', (err) => {
            console.error('UNHANDLED REJECTION: Shutting down...');
            console.error(err.name, err.message);
            server.close(() => {
                process.exit(1);
            })
        });

    } catch(error) {
        console.error('Failed to connect to database. Server shutting down.');
        console.error(error);
        process.exit(1);
    }
}

await startServer();




