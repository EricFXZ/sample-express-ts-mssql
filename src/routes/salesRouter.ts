import { Router } from 'express';
import { getPerformance } from '../controllers/salesController';

const salesRouter = Router();
salesRouter.get('/', getPerformance);

export default salesRouter;
