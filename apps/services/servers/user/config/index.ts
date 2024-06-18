import dotenv from 'dotenv';
import { processEnv } from '../types/environment';

// set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'DEV';

const envFound = dotenv.config();

if (!envFound || envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  PORT: process.env.USER_MS_PORT || 5010,
  NODE_ENV: process.env.NODE_ENV,

  APP_SECRET: process.env.APP_SECRET,

  POSTGRES_HOST: process.env.DB_HOST,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: process.env.POSTGRES_DB,

  KAFKA_HOST: process.env.KAFKA_HOST,
  KAFKA_PORT: process.env.KAFKA_PORT,

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT || 6379,

  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
  FACEBOOK_CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL,

  INSTAGRAM_APP_ID: process.env.INSTAGRAM_APP_ID,
  INSTAGRAM_APP_SECRET: process.env.INSTAGRAM_APP_SECRET,
  INSTAGRAM_CALLBACK_URL: process.env.INSTAGRAM_CALLBACK_URL,
} as processEnv;
