import jwt from 'jsonwebtoken';
import Seller from '../models/Seller.js';

export const protectSeller = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Please log in to access this resource'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if seller exists
    const seller = await Seller.findById(decoded.id);
    if (!seller) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid authentication token'
      });
    }

    // Add seller to request
    req.seller = seller;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid authentication token'
    });
  }
};