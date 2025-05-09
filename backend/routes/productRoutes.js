import express from 'express';
import { addProduct } from '../controllers/productController.js';
import { protectSeller } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route - only authenticated sellers can add products
router.post('/', protectSeller, addProduct);

export default router;