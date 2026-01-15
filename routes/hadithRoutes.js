import express from 'express';
const router = express.Router();

import hadithController from '../controllers/hadithController.js';
import { validateHadith, validate } from '../middlewares/validation.js';

// Public routes
router.get('/categories', hadithController.getCategories);
router.get('/category/:category', hadithController.getHadithByCategory);
router.get('/search', hadithController.searchHadith);
router.get('/:id', hadithController.getHadithById);

// Protected routes (add authentication middleware)
// router.post('/', authMiddleware, validateHadith, validate, hadithController.addHadith);
// router.put('/:id', authMiddleware, validateHadith, validate, hadithController.updateHadith);
// router.delete('/:id', authMiddleware, hadithController.deleteHadith);

// For now, allow public posting (add auth later)
router.post('/', validateHadith, validate, hadithController.addHadith);

module.exports = router;