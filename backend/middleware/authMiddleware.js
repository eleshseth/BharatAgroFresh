import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Seller from '../models/Seller.js';

// Protect routes for regular users
export const protect = async (req, res, next) => {
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

    // Check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid authentication token'
      });
    }

    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid authentication token'
    });
  }
};

// Existing protectSeller middleware
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