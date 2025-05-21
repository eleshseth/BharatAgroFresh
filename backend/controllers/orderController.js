import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    
    // Get user ID from the authenticated request
    const userId = req.user._id;

    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      shippingAddress
    });

    res.status(201).json({
      status: 'success',
      data: { order }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      data: { orders }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};