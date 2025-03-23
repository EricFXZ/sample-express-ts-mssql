import { Router } from "express";
import { createBranch, listBranches, updateBranch } from "../controllers/branches-controllers";

const router = Router();

router.get('/branches',listBranches);

router.post('/branch', createBranch);

router.patch('/branch/:codigoSucursal',updateBranch);

export default router;