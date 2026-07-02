import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
const connectDB=asyncHandler(async()=>{
    await mongoose.connect(process.env.MONGODBURL);
    console.log('DataBase is connected!!!');
})
export default connectDB;