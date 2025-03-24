import { Router } from "express";
import { signIn } from "../controller/auth-controllers";

const router  = Router();

router.post('/auth/signIn', signIn);
1
export default router;