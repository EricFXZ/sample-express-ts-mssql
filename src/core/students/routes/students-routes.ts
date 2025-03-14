import { Router } from "express"
import { listStudents } from "../controllers/students-controllers";

const router = Router();

router.get('/students', listStudents);

export default router;