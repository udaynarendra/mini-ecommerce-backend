import mongoose from 'mongoose';

const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        trim:true,
        required:true
    },
    stock:{
        type:Number,
        trim:true,
        required:true,
        default:0,
        min:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Category ID must required"]
    },
    brand:{
        type:String,
        trim:true,
        required:true
    }
},{timestamps:true})
const Product=mongoose.model("Product",ProductSchema);
export default Product;