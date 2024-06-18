export interface ImageContent {
  type: 'image';
  data: File;
}

export interface VideoContent {
  type: 'video';
  data: File;
}

export interface TextContent {
  type: 'text';
  text: string;
}

export interface Content {
  title: string;
  text?: string;
  description: string,
  file?: File;
  URL?: string;
  media_type: ImageContent | VideoContent | TextContent;
}

export interface Payload {
  userID: string;
  platforms: string[];
  content: Content[];
  cost: number;
  time: string;
}

export interface ProcessEnv {
  UPLOAD_MS_PORT: string,
  PORT: string;
  LOGGER: string;
  NODE_ENV: string;
  SERVER_NAME: string;

  AWS_BUCKET: string,
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  PLATFORMS_UPLOAD_LIMIT: number;

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
  RABBITMQ_HOST: string;
}
