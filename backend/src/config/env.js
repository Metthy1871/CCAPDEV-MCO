import 'dotenv/config';


const config = {
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_URI,
    nodeEnv: process.env.NODE_ENV || "development",
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
}