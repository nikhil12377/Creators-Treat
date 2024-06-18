import { Router } from 'express';
import auth from './routes/auth';
import accounts from './routes/accounts';

export default () => {
  const router = Router();
  auth(router);
  accounts(router);
  return router;
};
