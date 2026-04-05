import config from './env.js';
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // global query-filter sanitization to reduce query selector injection risk
        mongoose.set('sanitizeFilter', true);

        const conn = await mongoose.connect(config.mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}.`);
        console.log(`Mode: ${config.nodeEnv}`);
        
    } catch(error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;