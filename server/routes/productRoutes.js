import express from 'express';
import {createAiProduct} from '../controller/productController.js';

const router = express.Router();
router.post('/ai-product', createAiProduct);

export default router;