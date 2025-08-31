const dotenv = require("dotenv");
dotenv.config();

const _config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_SECRET_EXPIRES_IN: process.env.JWT_SECRET_EXPIRES_IN,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    TOMTOM_API_KEY: process.env.TOMTOM_API_KEY,
    SEARCH_RADIUS_KM: process.env.SEARCH_RADIUS_KM,
};

module.exports = Object.freeze(_config);