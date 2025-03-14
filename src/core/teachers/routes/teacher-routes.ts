import { Router } from "express";
import { listTeachers } from "../controllers/teachers-controllers";
const router = Router();

router.get('/teachers',listTeachers);

export default router;