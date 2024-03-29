import express from 'express'
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from '../controller/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router=express.Router();

router.route('/').get(getProducts).post(protect,admin,createProduct);
router.get('/top',getTopProducts);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id',).get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct);


export default router