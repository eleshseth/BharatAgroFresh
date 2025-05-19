import Product from '../models/Product.js';

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      weightOptions,
      moq,
      packaging,
      delivery,
      shipping,
      locations,
      stock
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !image || !weightOptions || 
        !moq || !packaging || !delivery || !shipping || !locations) {
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
      image,
      weightOptions,
      moq,
      packaging,
      delivery,
      shipping,
      locations,
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
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('seller', 'businessName') // Optionally populate seller info
      .lean();

    const formattedProducts = products.map(product => ({
      id: product._id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
      weightOptions: product.weightOptions,
      moq: product.moq,
      packaging: product.packaging,
      delivery: product.delivery,
      shipping: product.shipping,
      locations: product.locations,
      stock: product.stock || 0,
      seller: product.seller
    }));

    res.status(200).json({
      status: 'success',
      count: products.length,
      data: {
        products: formattedProducts
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
      weightOptions: req.body.weightOptions,
      moq: req.body.moq,
      packaging: req.body.packaging,
      delivery: req.body.delivery,
      shipping: req.body.shipping,
      locations: req.body.locations,
      stock: req.body.stock
    };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { product }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};