import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { addPaymentMethod, addShippingAddress, addToCart, getCartItems, removeCartProducts } from '../controller/cartController.js';

const router=express.Router();

router.route('/').get(protect,getCartItems).post(protect,addToCart).put(protect,addShippingAddress).delete(protect,removeCartProducts);
router.route('/payment').put(protect,addPaymentMethod)
export default router;