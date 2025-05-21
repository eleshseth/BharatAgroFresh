import express from 'express';
import { protectSeller } from '../middleware/authMiddleware.js';
import { 
  addProduct, 
  getProducts, 
  updateProduct,
  getSellerProducts,
  getProduct // Add this import
} from '../controllers/productController.js';

const router = express.Router();

// Move the seller-products route before the general routes
router.get('/seller-products', protectSeller, getSellerProducts);
router.post('/', protectSeller, addProduct);
router.get('/', getProducts);
router.patch('/:id', protectSeller, updateProduct);

// Add this route before other routes
router.get('/:id', getProduct);

export default router;