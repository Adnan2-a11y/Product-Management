import express from 'express';
import productRoutes from './product.routes.js';

const router = express.Router();

// Mount product routes under /api/v1/products
router.use('/products', productRoutes);

export default router;