import { Router } from 'express';
import upload from './routes/upload';

export default () => {
  const router = Router();
  upload(router);
  return router;
};
