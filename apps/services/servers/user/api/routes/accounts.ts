import { Router } from 'express';
import { instagramInitialLogin, instagramCallback } from '../../controller/accounts/instagram';

const connectRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/auth/connect', connectRouter);
  connectRouter.get('/instagram', instagramInitialLogin);
  connectRouter.get('/instagram/callback', instagramCallback);
};
