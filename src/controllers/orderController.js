import { readFileData, writeFileData } from "../utils/filehandling.js";
import sendEmail from "../utils/notification.js";

const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const email = req.user.email;

        const allCarts = await readFileData('carts.json');
        const isUserExisting = allCarts.find((user) => user.userId === userId);
        if (!isUserExisting) {
            return res.status(404).json({
                message: 'User Cart does not exists'
            });

        }
        if (isUserExisting.items.length === 0) {
            return res.status(400).json({
                message: 'cart is empty'
            })
        };
        const ProductDetails = await readFileData('products.json');
        const invalidProduct = isUserExisting.items.find((cart) => {
            return !ProductDetails.find((product) => product.id === cart.productId)
        });
        if (invalidProduct) {
            return res.status(404).json({
                message: 'product does not exists'
            });
        }
        const inSufficientStock = isUserExisting.items.find((cart) => {
            const product = ProductDetails.find((product) => product.id === cart.productId);
            return product.stock < Number(cart.quantity);
        });
        if (inSufficientStock) {
            return res.status(400).json({
                message: 'Insufficient Stock'
            });
        }

        const totalAmount = isUserExisting.items.reduce((total, item) => {

            const products = ProductDetails.find((product) => product.id === item.productId);

            if (!products) {
                return total;
            }
            return total + Number(products.price) * Number(item.quantity);
        }, 0);

        const allOrders = await readFileData('orders.json');
        const newOrder = {
            orderId: 'ORD' + Date.now(),
            userId,
            items: isUserExisting.items,
            status: 'pending',
            totalAmount,
            paymentStatus: 'pending',
            createdAt: new Date().toISOString()
        };
        allOrders.push(newOrder);
        await writeFileData('orders.json', allOrders);
        isUserExisting.items.forEach((cart) => {

            const product =
                ProductDetails.find(
                    (p) => p.id === cart.productId
                );

            if (product) {

                product.stock -= Number(
                    cart.quantity
                );

            }

        });

        await writeFileData(
            'products.json',
            ProductDetails
        );

        isUserExisting.items = [];

        await writeFileData(
            'carts.json',
            allCarts
        );
        //saving notification data
const allUsers=await readFileData('users.json');
const userDetails=allUsers.find((user)=>user.id===userId);
const userName=userDetails.name;
        const allNotification = await readFileData('notification.json');
        const newNotification = {
            notificationId: 'NOT' + Date.now(),
            userId,
            orderId: newOrder.orderId,
            message: 'Order Created Successfully',
            type: 'created-order',
            createdAt: new Date().toISOString()

        }
        allNotification.push(newNotification);
        await writeFileData('notification.json', allNotification);
        try {
            await sendEmail(email, 'Order Confirmation',`
                Hello ${userName}


                Your order has been created
                successfully.
                
                Order Details:
                Order ID:${newOrder.orderId}
                Total Amount:Rs${newOrder.totalAmount}
                Order Status:${newOrder.status}
                Thank you for shopping with us.
                `);
                
        }
        catch (error) {
            console.log(error)
        }

        return res.status(201).json({
            message: 'Order created successfully',
            order: newOrder
        });


    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const getOrder = async (req, res) => {
    try {

        const orderId = req.params.id;
        const userId = req.user.id;

        const allOrders = await readFileData('orders.json');
        const allProducts = await readFileData('products.json');

        // Get all orders of logged in user
        const userOrders = allOrders.filter(
            (order) => order.userId === userId
        );

        // If user has no orders
        if (userOrders.length === 0) {
            return res.status(404).json({
                message: 'No orders found'
            });
        }

        // GET /orders/:id
        if (orderId) {

            const singleOrder = userOrders.find(
                (order) => order.orderId === orderId
            );

            if (!singleOrder) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            }

            const responseDetails = singleOrder.items.map((item) => {

                const product = allProducts.find(
                    (product) =>
                        product.id === item.productId
                );

                if (!product) {
                    return {
                        message: 'Product does not exist'
                    };
                }

                return {
                    title: product.title,
                    price: product.price,
                    quantity: item.quantity,
                    total: product.price * Number(item.quantity)
                };

            });

            return res.status(200).json({
                message: 'Response Ok',
                orders: responseDetails
            });

        }

        // GET /orders
        const responseDetails = userOrders.map((order) => {

            const items = order.items.map((item) => {

                const product = allProducts.find(
                    (product) =>
                        product.id === item.productId
                );

                if (!product) {
                    return {
                        message: 'Product does not exist'
                    };
                }

                return {
                    title: product.title,
                    price: product.price,
                    quantity: item.quantity,
                    total: product.price * Number(item.quantity)
                };

            });

            return {
                orderId: order.orderId,
                items
            };

        });

        return res.status(200).json({
            message: 'Response Ok',
            orders: responseDetails
        });

    } catch (error) {

        return res.status(500).json({
            message: 'Internal Server Error'
        });

    }
}

const updateOrder = async (req, res) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id;
        const allOrders = await readFileData('orders.json');
        const isOrder = allOrders.find((order) => order.orderId === orderId);
        if (!isOrder) {
            return res.status(400).json({
                message: 'Order not found'
            });

        }

        const updatedOrder = allOrders.map((order) => {
            if (order.orderId === orderId) {
                return {
                    ...order,
                    status
                }

            }
            return order;
        });

        await writeFileData('orders.json', updatedOrder);
        return res.status(200).json({
            message: 'updated successfully'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }

}

export { createOrder, getOrder, updateOrder };