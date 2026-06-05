import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken';
const jwt_secret = process.env.JWT_SECRET;

const authMiddleware=(req,res,next)=>{
    try{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:'Token not found'
        })
    }
const decoded=jwt.verify(token,jwt_secret);
req.user=decoded;
next()
    }
    catch(error){
        return res.status(401).json({
            message:'no token exists'
        })
    }

}

export default authMiddleware;