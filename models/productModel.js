import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
   photoUrl: { type: String, required: true },
   title: { type: String, required: true },
   prevPrice: { type: Number, required: true },
   currentPrice: { type: Number, required: true },
   inStock: { type: Boolean, default: false },
   features: { type: Array, default: [] },
   category: { type: String, required: true },
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

export default Product;