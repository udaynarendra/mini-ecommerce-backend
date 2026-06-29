import express from 'express';
import {register,login} from '../controllers/authController.js';
import limiter from '../middlewares/authRateLimiter.js';
const authRouter = express.Router();
authRouter.post('/register',limiter,register);
authRouter.post('/login',limiter,login);

export default authRouter;