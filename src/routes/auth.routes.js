import { Router } from 'express';
import { signIn, signUp } from '../controllers/auth.controller.js';
import {
  checkExistingUser,
  checkExistingRole,
} from '../middlewares/verifySignup.js';

const router = Router();

router.post('/signin', signIn);
router.post('/signup', checkExistingUser, signUp);

export default router;
