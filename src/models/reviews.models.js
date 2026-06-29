import mongoose from "mongoose"

const ReviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user id must be required"]
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:[true,"product id must be required"]
    },
    rating:{
        type:Number,
        min:0,
        default:0,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Review=mongoose.model("Review",ReviewSchema);
export default Review;