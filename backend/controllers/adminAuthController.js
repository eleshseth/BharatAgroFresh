import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already registered'
      });
    }

    // Create new admin
    const admin = await Admin.create({
      username,
      email,
      passwordHash: password,
      role: role || 'admin'
    });

    // Generate token
    const token = signToken(admin._id);

    // Remove password from output
    admin.passwordHash = undefined;

    res.status(201).json({
      status: 'success',
      token,
      data: { admin }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
    }

    // Find admin and check password
    const admin = await Admin.findOne({ email }).select('+passwordHash');
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Your account is inactive'
      });
    }

    // Generate token
    const token = signToken(admin._id);

    // Remove password from output
    admin.passwordHash = undefined;

    res.status(200).json({
      status: 'success',
      token,
      data: { admin }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};