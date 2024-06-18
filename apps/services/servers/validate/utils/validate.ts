import crypto from 'crypto';
import { promisify } from 'util';
import redisClass from '@creators/loaders/redis';
import config from "../config"

const redisInstance = redisClass.getInstance(config.REDIS_HOST, config.REDIS_PORT);
const redisClient = redisInstance.getClient();

// Promisify Redis get method for async/await usage
const getAsync = promisify(redisClient.get).bind(redisClient);

/**
 * Hashes a token using SHA-256.
 * @param {string} token - The token to hash.
 * @return {string} The hashed token.
 */
const hashToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * Validates the presence of required cookies.
 * @param {Object} cookies - The cookies object from the request.
 * @return {boolean} True if required cookies are present, false otherwise.
 */
const hasRequiredCookies = (cookies: { [key: string]: string } | undefined): boolean => {
  return !!cookies && !!cookies?.accessToken && !!cookies?.refreshToken;
};

/**
 * Retrieves user data from Redis based on the hashed tokens.
 * @param {string} hashedAccessToken - The hashed access token.
 * @param {string} hashedRefreshToken - The hashed refresh token.
 * @return {Promise<Array>} The user data for access and refresh tokens.
 */
const getUserDataFromRedis = async (
  hashedAccessToken: string,
  hashedRefreshToken: string,
): Promise<[string | null | undefined, string | null | undefined]> => {
  return Promise.all([getAsync(`accessToken:${hashedAccessToken}`), getAsync(`refreshToken:${hashedRefreshToken}`)]);
};

export { hashToken, hasRequiredCookies, getUserDataFromRedis };
