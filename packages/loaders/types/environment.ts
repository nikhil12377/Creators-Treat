export interface ProcessEnv {
  PORT: string;
  DATABASE_URL: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_HOST: string;
  POSTGRES_DATABASE: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  REDIS_HOST: string,
  REDIS_PORT: number,
}

export interface SequelizeConfig {
  host: string;
  database: string;
  user: string;
  password: string;
}