import mongoose from 'mongoose';
const CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Category name is required"],
        trim:true,
        minlength:3
    },
    description:{
        type:String,
        required:[true,"Category description must be required"],
        trim:true
    },
    image:{
        type:String,
        trim:true,
        required:true
    }

},
{
    timestamps:true
});
const Category = mongoose.model("Category",CategorySchema);
export default Category;