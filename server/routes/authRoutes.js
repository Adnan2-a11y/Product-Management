import express from 'express';
import { signup, login, logout , checkOut} from '../controller/authController.js';
import { signupValidator, loginValidator } from '../middleware/validator.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/logout', logout);
router.get('/check', authenticate, checkOut);

export default router;