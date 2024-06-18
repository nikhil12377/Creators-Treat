import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import RedisClient from '@creators/loaders/redis';
import RedisSessionStore from '@creators/loaders/redisSessionStore';
import routes from '../api';
import config from '../config';

// creating a redis client instance
const redisInstance = RedisClient.getInstance(config.REDIS_HOST, config.REDIS_PORT);
const redisClient = redisInstance.getClient();

// creating a redisStore from RedisSessionStore class to store sessions in redis
const redisSessionStore = new RedisSessionStore(redisClient);
const redisStore = redisSessionStore.getRedisStore();

export default async ({ app }: { app: Application }) => {
  app.get('/status', (req: Request, res: Response) => {
    res.status(200).json({ status: 'It works fine' });
  });

  // middlewares
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // session middleware
  app.use(
    session({
      secret: config.APP_SECRET,
      resave: false,
      saveUninitialized: true,
      store: redisStore,
      cookie: { secure: false, maxAge: 60000 },
    }),
  );

  // other routes
  app.use(routes());

  app
    .listen(config.PORT, () => {
      console.log('----------------------------------------------');
      console.log('\n\x1b[33m%s\x1b[0m', `User Service started on port http://localhost:${config.PORT}`, '\u001b[0m\n');
      console.log('----------------------------------------------');
    })
    .on('error', (err) => {
      console.log('Error in User Service:', err);
      process.exit(1);
    });
};
