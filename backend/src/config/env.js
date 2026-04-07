import 'dotenv/config';

const toNumber = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

// parse env booleans once so the rest of the app can use typed config values
const toBoolean = (value, fallback) => {
    if (typeof value !== 'string') return fallback;

    const normalized = value.trim().toLowerCase();

    if (normalized === '1' || normalized === 'true') return true;
    if (normalized === '0' || normalized === 'false') return false;

    return fallback;
};

const nodeEnv = process.env.NODE_ENV || "development";

const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    nodeEnv,
    // TRUST_PROXY accepts 1/true/0/false; if unset, default to true in production.
    trustProxy: toBoolean(process.env.TRUST_PROXY, nodeEnv === 'production'),
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    rateLimitGlobalMax: toNumber(process.env.RATE_LIMIT_GLOBAL_MAX, 3),
    rateLimitSearchMax: toNumber(process.env.RATE_LIMIT_SEARCH_MAX, 3),
    rateLimitAuthMax: toNumber(process.env.RATE_LIMIT_AUTH_MAX, 3),
}

export default config;