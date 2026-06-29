import { readFileData, writeFileData } from "../utils/filehandling.js";


const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        const allCarts = await readFileData('carts.json');
        const item = {
            productId: productId,
            quantity: Number(quantity)
        }
        const isUserExisting = allCarts.find((user) => user.userId === userId);
        if (isUserExisting) {
            isUserExisting.items.push(item)
        }
        else {
            const newCart = {
                userId: userId,
                items: [item]
            }
            allCarts.push(newCart);
        }

        await writeFileData('carts.json', allCarts);
        return res.status(201).json({
            success:true,
            message: 'Product added to cart successfully',
            data:newCart
        });


    }
    catch (error) {
        return res.status(500).json({
            success:false,
            message: 'Internal Server Error'
        })
    }
}


const getAllCartProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        const allCarts = await readFileData('carts.json');
        const isUserExisting = allCarts.find((user) => user.userId === userId);

        if (!isUserExisting) {
            return res.status(404).json({
                message: 'Cart is empty'
            });
        }


        const allProducts = await readFileData('products.json');
        let grandTotal = 0;
        const responseDetails = isUserExisting.items.map((item) => {

            const productDetails = allProducts.find((product) => product.id === item.productId);
            const total = productDetails.price * Number(item.quantity);
            grandTotal += total;

            return {
                title: productDetails.title,
                price: productDetails.price,
                quantity: Number(item.quantity),
                total
            }
        });
        return res.status(200).json({
            items: responseDetails,
            grandTotal
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'Internal Server Error'
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        const allCarts = await readFileData('carts.json');
        const productsData = await readFileData('products.json');
        const isUserExisting = allCarts.find((user) => user.userId === userId)
        if (!isUserExisting) {
            return res.status(404).json({
                message: 'user doesnot exists'
            });
        }
        const productDetails = productsData.find((product) => product.id === productId);
        if (!productDetails) {
            return res.status(404).json({
                message: 'product does not exists'
            });
        }
        const stock = productDetails.stock;
        if (stock === 0 || stock < Number(quantity)) {
            return res.status(400).json({
                message: 'Insufficient stock'
            });
        }
        if (quantity <= 0) {
            return res.status(400).json({
                message: 'Quantity must be greater than zero'
            });
        }
        const updatedCartDetails = isUserExisting.items.find((cart) => cart.productId === productId);
        if (!updatedCartDetails) {
            return res.status(404).json({
                message: 'product not found in cart'
            })
        }
        updatedCartDetails.quantity = quantity;
        const updatedCart = allCarts.map((cart) => {
            if (cart.userId === userId) {
                return isUserExisting;
            }
            return cart;
        });

        await writeFileData('carts.json', updatedCart);
        return res.status(200).json({
            message: 'Cart Quantity Updated Successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'Internal Server Error'
        });
    }
}


const deleteCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        const allCarts = await readFileData('carts.json');
        const isUserExisting = allCarts.find((user) => user.userId === userId);
        if (!isUserExisting) {
            return res.status(404).json({
                message: 'user does not exists'
            });
        }
        const isCartProductExisting = isUserExisting.items.find((cart) => cart.productId === productId);
        if (!isCartProductExisting) {
            return res.status(404).json({
                message: 'product not found in cart'
            });
        }
        const afterDeletingCartProduct = isUserExisting.items.filter((cart) => cart.productId !== productId);

        const afterDeleting = allCarts.map((cart) => {
            if (cart.userId === userId) {
                return {
                    ...cart,
                    items:afterDeletingCartProduct
                };
            }
            return cart;
        });
        await writeFileData('carts.json',afterDeleting);
        return res.status(200).json({
            success:true,
            message: 'Cart Deleted Successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'Internal Server Error'
        });
    }
}

export { addToCart, getAllCartProduct, updateCart, deleteCart };