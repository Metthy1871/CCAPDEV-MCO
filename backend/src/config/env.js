import 'dotenv/config';


const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    nodeEnv: process.env.NODE_ENV || "development",
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
}

export default config;