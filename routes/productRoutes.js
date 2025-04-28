import express from 'express';
import { createProduct, deleteProduct, getFeaturedProducts, getAllProducts, getInStockProduct, getSingleProduct } from '../controllers/ProductController.js';

const router = express.Router();

router.get('/', getAllProducts)
router.get('/featured', getFeaturedProducts)
router.get('/inStock', getInStockProduct)
router.get('/:id', getSingleProduct)
router.post('/', createProduct)
router.delete('/:id', deleteProduct)


export default router;