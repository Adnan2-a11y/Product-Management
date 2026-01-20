import express from 'express';
import { signup, login, logout } from '../controller/authController.js';
import { signupValidator, loginValidator } from '../middleware/validator.js';

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/logout', logout);

export default router;