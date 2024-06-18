import { Router } from 'express';
import validateController from '../../controller/auth';

const authRouter = Router();

// the route created with this would be /auth/login/zerodha
export default (baseRouter: Router) => {
  baseRouter.use('/validate', authRouter);
  authRouter.get('/', validateController);
};
