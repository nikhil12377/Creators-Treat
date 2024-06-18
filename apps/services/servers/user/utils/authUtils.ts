import jwt, { JwtPayload } from 'jsonwebtoken';
import RedisClientClass from '@creators/loaders/redis';
import { Response } from 'express';
import { createHash } from 'crypto';
import config from '../config';

const redisInstance = RedisClientClass.getInstance(config.REDIS_HOST, config.REDIS_PORT);
const redisClient = redisInstance.getClient();

// Generate JWT token
const generateJWT = (userid: string, expiresIn: string) => {
  return jwt.sign({ userid }, config.APP_SECRET, { expiresIn });
};

// Generate hash for JWT token
const generateHash = (token: string) => createHash('sha256').update(token).digest('hex');

// Verify JWT token
const verifyJWT = (token: string) => {
  return jwt.verify(token, config.APP_SECRET);
};

// Decode JWT token
const decodeJWT = async (token: string) => {
  return jwt.decode(token);
};

// Check if JWT token is expired
const isJWTExpired = (token: string) => {
  try {
    verifyJWT(token);
    return false; // Token not expired
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return true; // Token expired
    }
    throw error;
  }
};

// handle expired access token
const handleExpiredAccessToken = async (refreshToken: string) => {
  if (isJWTExpired(refreshToken)) {
    // refreshToken is also expired, ask user to login again
    return { shouldReLogin: true };
  }
  // refreshToken is not expired, generate new accessToken
  const decoded = (await decodeJWT(refreshToken)) as JwtPayload;
  if (!decoded || typeof decoded === 'string' || !decoded.userId) {
    throw new Error('Invalid refreshToken');
  }

  // generate new accessToken using the userId from refreshToken
  const newAccessToken = generateJWT(decoded.userId, '1h');
  return { newAccessToken };
};

// setAuthentication Token
const setAuthenticationToken = async (userId: string) => {
  // generate accessToken and refreshToken
  const accessToken = generateJWT(userId, '1h');
  const refreshToken = generateJWT(userId, '7d');

  // encrypt accessToken and refreshToken
  const hashedAccessToken = generateHash(accessToken);
  const hashedRefreshToken = generateHash(refreshToken);

  // structure user data for storage
  const userdata = JSON.stringify({ userId, accessToken, refreshToken });
  
  // set userdata to redis
  await Promise.all([
    redisClient.set(
      `accessToken:${hashedAccessToken}`,
      userdata,
      'EX',
      3600 // 1 hour
    ),
    redisClient.set(
      `refreshToken:${hashedRefreshToken}`,
      userdata,
      'EX',
      604800 // 7 days
    ),
  ]);

  return {accessToken, refreshToken};
};

// getUserId from hashed accessToken
const getUserIDFromRedis = async (hashedAccessToken: string) => {
  const userdata = await redisClient.get(`accessToken:${hashedAccessToken}`);
  if (!userdata) {
    throw new Error('Invalid accessToken');
  }
  const { userId } = JSON.parse(userdata);
  return userId;
};

// Export all functions
export {
  generateJWT,
  verifyJWT,
  decodeJWT,
  isJWTExpired,
  handleExpiredAccessToken,
  setAuthenticationToken,
  getUserIDFromRedis,
};
