import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {createOrder,getOrder,updateOrder} from '../controllers/orderController.js';
import adminMiddleware from '../middlewares/adminMiddleware.js'
const orderRouter=express.Router();
orderRouter.post('/',authMiddleware,createOrder);
orderRouter.get('/:id',authMiddleware,getOrder);
orderRouter.get('/',authMiddleware,getOrder);
orderRouter.put('/:id',authMiddleware,adminMiddleware,updateOrder);

export default orderRouter;