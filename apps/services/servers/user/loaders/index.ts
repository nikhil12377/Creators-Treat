import { Application } from 'express';
import expressLoader from './express';
import { sequelizeLoader } from './sequelize';
import swaggerSpec from '../swaggerSpec';
import loaders from '@creators/loaders';

export default async ({ expressApp }: { expressApp: Application }) => {
  expressLoader({ app: expressApp });
  sequelizeLoader();
  loaders({ expressApp: expressApp, swaggerSpec, services: ["swagger", "error"] });
};
