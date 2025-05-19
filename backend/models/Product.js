import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  weightOptions: { type: [String], required: true },
  moq: { type: String, required: true },
  packaging: { type: String, required: true },
  delivery: { type: String, required: true },
  shipping: { type: String, required: true },
  locations: { type: String, required: true },
  stock: { type: Number, default: 0 },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);