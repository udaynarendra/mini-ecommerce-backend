import { match } from 'assert';
import mongoose from 'mongoose';

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        unique:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email Format"]
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:[8,"password must be atleast 8 characters"],
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    phone:{
        type:String,
        trim:true,
        required:true,
        minlength:[10,"phone number must be 10 digits"],
        maxlength:[10,"phone number must be 10 digits"]
    },
    address:{
        type:String,
        trim:true,
        required:[true,"Address must required"]
    }
},{timestamps:true});

const User=mongoose.model("User",UserSchema);
export default User;
