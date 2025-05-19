import express from 'express';
import { protectSeller } from '../middleware/authMiddleware.js';
import { 
  addProduct, 
  getProducts, 
  updateProduct 
} from '../controllers/productController.js';

const router = express.Router();

// Change this line
router.post('/', protectSeller, addProduct);  // Remove 'addproduct' from the path
router.get('/', getProducts);
router.patch('/:id', protectSeller, updateProduct);

export default router;