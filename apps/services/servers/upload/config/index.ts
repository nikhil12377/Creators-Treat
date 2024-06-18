import dotenv from 'dotenv';
import { ProcessEnv } from '../types/environment';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'DEV';

const envFound = dotenv.config();

if (envFound.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");

export default {
  UPLOAD_MS_PORT: process.env.UPLOAD_MS_PORT,
  PORT: process.env.USER_MS_PORT || 5010,
  LOGGER: process.env.LOGGER,
  NODE_ENV: process.env.NODE_ENV,
  SERVER_NAME: process.env.SERVER_NAME,

  AWS_BUCKET: process.env.AWS_BUCKET,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  PLATFORMS_UPLOAD_LIMIT: Number(process.env.PLATFORMS_UPLOAD_LIMIT),

  DATABASE_URL: process.env.DATABASE_URL,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,

  KAFKA_HOST: process.env.KAFKA_HOST,

  APP_HOME_URL: process.env.APP_HOME_URL,
  APP_LOGIN_URL: process.env.APP_LOGIN_URL,
  APP_SECRET: process.env.APP_SECRET,

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  RABBITMQ_HOST: process.env.RABBITMQ_HOST
} as ProcessEnv;
