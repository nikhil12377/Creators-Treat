import { Application } from 'express';
import { syncUploadsInBackground } from './kafka';
import expressLoader from "./express";
import loaders from "@creators/loaders";
import swaggerSpec from "../swaggerSpec";
import { sequelizeLoader } from './sequelize';

export default async ({ expressApp }: { expressApp: Application }) => {
  expressLoader({ app: expressApp })
  loaders({ expressApp: expressApp, swaggerSpec, services: ["swagger"] });
  sequelizeLoader()
  syncUploadsInBackground();
};
