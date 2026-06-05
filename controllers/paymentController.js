import { readFileData, writeFileData } from '../utils/filehandling.js';


const createPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod } = req.body;
        //checking order
        const allOrders = await readFileData('orders.json');
        const isOrder = allOrders.find((order) => order.orderId === orderId);
        if (!isOrder) {
            return res.status(400).json({
                message: 'order not found'
            });
        }

        // checking order status
        if (isOrder.status.toLowerCase() === 'cancelled') {
            return res.status(400).json({
                message: 'order cancelled'
            });
        }
        //checking payment
        const allPayments = await readFileData('payment.json');
        const isPayment = allPayments.find((payment) => payment.orderId === orderId);
        if (isPayment) {
            return res.status(400).json({
                message: 'payment already completed'
            });
        }
        const newPayment = {
            paymentId: 'PAY' + Date.now(),
            orderId,
            userId: isOrder.userId,
            amount: isOrder.totalAmount,
            paymentMethod,
            status: 'success'
        };
        allPayments.push(newPayment);
        await writeFileData('payment.json', allPayments);
        return res.status(201).json({
            message: 'payment created successfully',
            payment:newPayment
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }


}
const getPaymentDetails=async(req,res)=>{
    try{
        const paymentId=req.params.paymentId;
        const userId=req.user.id;
        const allPayments=await readFileData('payment.json');
       const userPayments=allPayments.filter((payment)=>payment.userId===userId);
        if(userPayments.length===0){
            return res.status(404).json({
                message:'No payments found'
            });
        }
        if(paymentId){
        const isPayment=userPayments.find((payment)=>payment.paymentId===paymentId);
        if(!isPayment){
            return res.status(404).json({
                message:'payment not found'
            });
        }
        return res.status(200).json({
            message:'Response Ok',
            payment:isPayment
        });
        }
        return res.status(200).json({
            message:'Response Ok',
            payment:userPayments
        });
    }catch(error){
        return res.status(500).json({
            message:'Internal Server Error'
        });
    }
}

export {getPaymentDetails,createPayment};