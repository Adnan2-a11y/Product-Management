import express from 'express';
import { createProduct, updateProduct, getAllProducts, getProductBySlug} from '../controller/productController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createProduct);
router.put('/:id', authenticate, updateProduct);
router.get('/get-products', getAllProducts);
router.get('/:slug', getProductBySlug);

export default router;