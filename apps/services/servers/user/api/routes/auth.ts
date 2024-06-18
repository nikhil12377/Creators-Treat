import { Router } from 'express';
import { facebookInitialLogin, facebookLoginCallback } from '../../controller/auth';

const authRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/auth', authRouter);
  authRouter.get('/login/facebook', facebookInitialLogin);
  authRouter.get('/facebook/callback', facebookLoginCallback);
};
