import express from 'express';
import { createProduct, updateProduct, getAllProducts, getProductBySlug} from '../controller/productController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// 📌 IMPORTANT: Specific routes MUST come before parameterized routes!
router.get('/get-products', getAllProducts);  // Specific route first
router.post('/', authenticate, createProduct);
router.put('/:id', authenticate, updateProduct);
router.get('/:slug', getProductBySlug);       // Generic route last

export default router;