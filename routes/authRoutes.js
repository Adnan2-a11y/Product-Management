import express from 'express';
import { signup, login, logout , checkOut} from '../controller/authController.js';
import { signupValidator, loginValidator } from '../middleware/validator.js';

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/logout', logout);
router.post('/checkout', checkOut);

export default router;