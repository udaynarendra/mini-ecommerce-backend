import mongoose from 'mongoose';

const product = {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "product id must be required"]
};
const quantity = {
    type: Number,
    min: 1,
    required: true
};
const price = {
    type: Number,
    required: true,
    min: 1
}
const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User Id must be required"]
    },
    items: [{
        product,
        quantity,
        price
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 1
    },
    validate: {
        validator: items => items.length > 0,
        message: "Cart items must be atleast 1"
    }
},
    {
        timestamps: true
    })
const Cart =mongoose.model("Cart",CartSchema);

export default CartSchema;