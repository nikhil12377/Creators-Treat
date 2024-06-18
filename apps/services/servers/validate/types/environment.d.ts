export interface ProcessEnv {
  PORT: string;
  LOGGER: string;
  NODE_ENV: string;
  SERVER_NAME: string;

  KITE_API_KEY: string;
  KITE_API_SECRET: string;
  KITE_BASE_URL: string;
  KITE_REDIRECT_URL: string;

  DATABASE_URL: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_HOST: string;
  POSTGRES_DATABASE: string;

  KAFKA_HOST: string;

  APP_HOME_URL: string;
  APP_LOGIN_URL: string;
  APP_SECRET: string;

  REDIS_HOST: string;
  REDIS_PORT: number;
}
