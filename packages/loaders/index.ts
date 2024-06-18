import { Application } from 'express';
import swaggerLoader from './swagger';
import errorLoader from './errors';

export default async ({ expressApp, swaggerSpec, services }: { expressApp: Application, swaggerSpec: object, services: string[] }) => {
  if (services.includes("swagger")) {
    swaggerLoader({ app: expressApp, swaggerSpec });
  }

  if (services.includes("error")) {
    errorLoader({ app: expressApp });
  }
};
