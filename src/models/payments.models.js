import mongoose from 'mongoose';
const PaymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: [true, "Order id must be required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requied: [true, "user id must be required"]
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ["cod", "upi", "card", "netbanking", "wallet"],
            message: "Invalid payment method"
        },
        default: "cod",
        required: true,
        trim: true
    },
    transactionId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    paymentStatus: {
        type: String,
        required: true,
        trim: true,
        enum: {
            values: ["pending",
                "paid",
                "failed",
                "refunded"],
            message: "Invalid payment Status"
        }
    },
    paidAt: {
        type: Date,
        required: true
    }
},
    {
        timestamps: true
    })

const Payment=mongoose.model("Payment",PaymentSchema);
export default Payment;