export interface processEnv {
  PORT: number;
  NODE_ENV: string;

  APP_SECRET: string;

  POSTGRES_HOST: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;

  KAFKA_HOST: string;
  KAFKA_PORT: string;

  REDIS_HOST: string;
  REDIS_PORT: number;

  FACEBOOK_APP_ID: string;
  FACEBOOK_APP_SECRET: string;
  FACEBOOK_CALLBACK_URL: string;

  INSTAGRAM_APP_ID: string;
  INSTAGRAM_APP_SECRET: string;
  INSTAGRAM_CALLBACK_URL: string;
}
