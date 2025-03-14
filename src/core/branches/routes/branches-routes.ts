import { Router } from "express";
import { listBranches } from "../controllers/branches-controllers";

const router = Router();

router.get('/branches',listBranches);

export default router;