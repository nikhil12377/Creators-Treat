import dotenv from 'dotenv';
import { ProcessEnv } from '../types/environment';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'DEV';

const envFound = dotenv.config();

if (envFound.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");

export default {
  PORT: process.env.VALIDATE_MS_PORT || 6010,
  LOGGER: process.env.LOGGER,
  NODE_ENV: process.env.NODE_ENV,
  SERVER_NAME: process.env.SERVER_NAME,

  KAFKA_HOST: process.env.KAFKA_HOST,

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT),
} as ProcessEnv;
