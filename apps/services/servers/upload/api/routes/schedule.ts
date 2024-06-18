import { Router } from 'express';
import scheduleMedia from '../../controller/schedule';

const authRouter = Router();

// the route created with this would be /schedule
export default (baseRouter: Router) => {
    authRouter.post('/schedule', scheduleMedia);
};
