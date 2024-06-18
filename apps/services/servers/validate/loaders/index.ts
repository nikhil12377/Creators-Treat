import { Application } from 'express';
import expressLoader from './express';
import loaders from '@creators/loaders';
import swaggerSpec from "../swaggerSpec";

export default async ({ expressApp }: { expressApp: Application }) => {
  expressLoader({ app: expressApp });
  loaders({ expressApp: expressApp, swaggerSpec, services: ["swagger", "error"] });
};
