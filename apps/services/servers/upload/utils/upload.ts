import redisClass from "@creators/loaders/redis";
import crypto from 'crypto';
import logger from "@creators/logger";
import config from "../config"

const redisInstance = redisClass.getInstance(config.REDIS_HOST, config.REDIS_PORT);
const redisClient = redisInstance.getClient();

/**
 * Hashes a token using SHA-256.
 * @param {string} token - The token to hash.
 * @return {string} The hashed token.
 */
const hashToken = (token: string) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

const getUserIDFromRedis = async (hashedAccessToken: string) => {
    try {
        const userData = await redisClient.get(`accessToken:${hashedAccessToken}`);
        let userId;
        if (userData) {
            // If found userData in Redis, get the userId
            userId = JSON.parse(userData)?.userId;
        }
        return userId;
    } catch (error) {
        logger.log(`Error getting ID from Redis of token ${hashedAccessToken}:`);
        logger.error(error);
        throw error;
    }
};

export { hashToken, getUserIDFromRedis };