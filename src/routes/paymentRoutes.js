import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {createPayment,getPaymentDetails} from '../controllers/paymentController.js';
const paymentRouter=express.Router();
paymentRouter.post('/',authMiddleware,createPayment);
paymentRouter.get('/:id',authMiddleware,getPaymentDetails);
paymentRouter.get('/',authMiddleware,getPaymentDetails);
export default paymentRouter;