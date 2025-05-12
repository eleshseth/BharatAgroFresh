import express from 'express';
import { protectSeller } from '../middleware/authMiddleware.js';  // Changed from authenticateSeller
import Product from '../models/Product.js';
const router = express.Router();

// Add a GET route for the base endpoint
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      status: 'success',
      data: {
        products
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Add this route for getting seller's products
router.get('/seller', protectSeller, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.seller._id });
    res.json({
      status: 'success',
      data: {
        products
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Add POST route for creating products
router.post('/', protectSeller, async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields'
      });
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock: stock || 0,
      seller: req.seller._id
    });

    res.status(201).json({
      status: 'success',
      data: { product }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

export default router;