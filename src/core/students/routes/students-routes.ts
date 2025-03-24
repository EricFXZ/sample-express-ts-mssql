import { Router } from "express"
import { createStudent, listStudents, updateStudent } from "../controllers/students-controllers";

const router = Router();

router.get('/students', listStudents);

router.post('/student', createStudent);

router.patch('/student/:codigoAlumno', updateStudent);

export default router;