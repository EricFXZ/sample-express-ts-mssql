import { Router } from "express";
import { listCareers } from "../controllers/careers-controllers";

const router = Router();

router.get('/careers',listCareers);

export default router;