import Redis from 'ioredis';

class RedisClient {
  private static instance: RedisClient;

  private client: Redis;

  private constructor(REDIS_HOST: string, REDIS_PORT: number) {
    this.client = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
    });

    this.client.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.client.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  public static getInstance(REDIS_HOST: string, REDIS_PORT: number): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient(REDIS_HOST, REDIS_PORT);
    }

    return RedisClient.instance;
  }

  public getClient(): Redis {
    return this.client;
  }
}

export default RedisClient;
