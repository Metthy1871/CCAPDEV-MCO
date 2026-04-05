import 'dotenv/config';

const toNumber = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    nodeEnv: process.env.NODE_ENV || "development",
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    rateLimitGlobalMax: toNumber(process.env.RATE_LIMIT_GLOBAL_MAX, 3),
    rateLimitSearchMax: toNumber(process.env.RATE_LIMIT_SEARCH_MAX, 3),
    rateLimitAuthMax: toNumber(process.env.RATE_LIMIT_AUTH_MAX, 3),
}

export default config;