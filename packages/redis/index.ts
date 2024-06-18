import { Redis } from 'ioredis';
import memoize from 'lodash.memoize';

const getUserDataFromRedis = async (hashedAccessToken: string, redisClient: Redis) => {
  const redisResponse = await redisClient.get(`accessToken:${hashedAccessToken}`);
  if (redisResponse) {
    // If found userData in Redis, get the userId
    return JSON.parse(redisResponse);
  }
  // return userData;
  return {};
};

const memoizedGetUserDataFromRedis = memoize(getUserDataFromRedis);

export default memoizedGetUserDataFromRedis;
