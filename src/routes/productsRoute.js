import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import {addProduct,getAllProducts,deleteProduct,updateProduct} from '../controllers/productsControllers.js';
const productRouter=express.Router();
productRouter.get('/',getAllProducts);
productRouter.post('/',authMiddleware,adminMiddleware,addProduct);
productRouter.delete('/:id',authMiddleware,adminMiddleware,deleteProduct);
productRouter.put('/',authMiddleware,adminMiddleware,updateProduct);

export default productRouter;