import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createOrder, getUserOrders } from '../controllers/orderController.js';

const router = express.Router();

router.use(protect); // Protect all order routes

router.post('/', createOrder);
router.get('/user-orders', getUserOrders);

export default router;