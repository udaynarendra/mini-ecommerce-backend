import mongoose from "mongoose";

const product = {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
};
const quantity = {
    type: Number,
    min: 1,
    required: true
};
const price = {
    type: Number,
    min: 1,
    required: true
};

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        product,
        quantity,
        price
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: {
            values:
                ["pending",
                    "confirmed",
                    "shipped",
                    "delivered",
                    "cancelled"
                ],
            message: "Invalid order Status"
        },
        default: "pending",
    },
    paymentStatus: {
        type: String,
        enum: {
            values: ["pending",
                "paid",
                "failed",
                "refunded"
            ],
            message: "Invalid payment Status"
        }
    },
    shippingAddress: {
        type: String,
        required: true,
        trim: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: [true, "payment id must be requied"]
    }
},
    {
        timestamps: true
    })
const Order = mongoose.model("Order", OrderSchema);
export default Order;