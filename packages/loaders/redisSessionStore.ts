import Redis from 'ioredis';
import session from 'express-session';
import RedisStore from 'connect-redis';

class RedisSessionStore {
  private redisStore: session.Store;

  constructor(redisClient: Redis) {
    // In connect-redis v7.0.0 there is no need to pass session object in RadisStore for syncing sessions with Redis
    // here is the reference: https://github.com/tj/connect-redis/releases/tag/v7.0.0
    this.redisStore = new RedisStore({ client: redisClient });
  }

  public getRedisStore(): session.Store {
    return this.redisStore;
  }
}

export default RedisSessionStore;
