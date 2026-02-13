import config from './env.js';
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}.`);
        console.log(`Mode: ${config.nodeEnv}`);
        
    } catch(error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;