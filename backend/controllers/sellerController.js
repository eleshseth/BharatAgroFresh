import Seller from '../models/Seller.js';

export const getAllSellers = async (req, res) => {
  try {
    // Fetch all sellers but exclude sensitive information
    const sellers = await Seller.find()
      .select('-passwordHash')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: sellers.length,
      data: {
        sellers
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};