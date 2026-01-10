import express from 'express';
import { getUserProfile } from '../controller/profilecontroller.js';
//import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/profile', getUserProfile);

export default router;