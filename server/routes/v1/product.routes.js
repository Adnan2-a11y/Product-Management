import express from 'express';
import validate from '../../middleware/validate.js';    
import * as productController from '../../controller/product.controller.js';
import { createProductSchema } from '../../validations/product.validation.js';
import { authenticate, authorize } from '../../middleware/auth.js';

const router = express.Router();

// Route to create a new product with validation
// Professional Practice: Group routes by resource
router.route('/')
    .get(productController.getAllProducts)
    .post(authenticate,validate(createProductSchema), productController.createProduct);

export default router;