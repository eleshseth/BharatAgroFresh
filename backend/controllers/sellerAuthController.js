import Seller from '../models/Seller.js';
import jwt from 'jsonwebtoken';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const registerSeller = async (req, res) => {
  try {
    const {
      businessName,
      ownerName,
      email,
      password,
      businessType,
      gstNumber,
      phoneNumber,
      address,
    } = req.body;

    // Check if seller already exists
    const existingSeller = await Seller.findOne({
      $or: [{ email }, { gstNumber }],
    });

    if (existingSeller) {
      return res.status(400).json({
        status: 'error',
        message: 'Email or GST number already registered',
      });
    }

    // Create new seller
    const seller = await Seller.create({
      businessName,
      ownerName,
      email,
      passwordHash: password,
      businessType,
      gstNumber,
      phoneNumber,
      address,
    });

    // Generate token
    const token = signToken(seller._id);

    // Remove password from output
    seller.passwordHash = undefined;

    res.status(201).json({
      status: 'success',
      token,
      data: { seller },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password',
      });
    }

    // Find seller and check password
    const seller = await Seller.findOne({ email }).select('+passwordHash');
    if (!seller || !(await seller.comparePassword(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    // Check if seller is active
    if (!seller.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Your account is inactive. Please contact support.',
      });
    }

    // Generate token
    const token = signToken(seller._id);

    // Remove password from output
    seller.passwordHash = undefined;

    res.status(200).json({
      status: 'success',
      token,
      data: { seller },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};
