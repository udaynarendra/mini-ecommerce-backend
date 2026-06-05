import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { addToCart, getAllCartProduct, updateCart, deleteCart } from '../controllers/cartController.js';
const cartRouter = express.Router();

cartRouter.post('/', authMiddleware, addToCart);
cartRouter.get('/', authMiddleware, getAllCartProduct);
cartRouter.put('/', authMiddleware, updateCart);
cartRouter.delete('/:id', authMiddleware, deleteCart);


export default cartRouter;