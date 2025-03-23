import { Router } from "express";
import { createTeacher, listTeachers } from "../controllers/teachers-controllers";
const router = Router();

router.get('/teachers',listTeachers);

router.post('/teacher', createTeacher);
export default router;