import { Router } from "express";
import { createTeacher, listTeachers, updateTeacher } from "../controllers/teachers-controllers";
const router = Router();

router.get('/teachers', listTeachers);

router.post('/teacher', createTeacher);

router.patch('/teacher/:codigoDocente', updateTeacher);
export default router;