import express from 'express';
import { registerSeller, loginSeller } from '../controllers/sellerAuthController.js';
import { getAllSellers } from '../controllers/sellerController.js';
import { protectSeller } from '../middleware/authMiddleware.js';

const router = express.Router();

// Auth routes
router.post('/register', registerSeller);
router.post('/login', loginSeller);

// Get all sellers route
router.get('/all', getAllSellers);

export default router;