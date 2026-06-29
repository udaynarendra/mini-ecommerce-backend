import { readFileData, writeFileData } from "../utils/filehandling.js";

const getAllProducts = async (req, res) => {
    try {

        let { category, search, minPrice, maxPrice, sort } = req.query;
        let filteredProducts
        const allProducts = await readFileData('products.json');
        filteredProducts = allProducts;
        // filter by category
        if (category) {
            category = category.toLowerCase();
            filteredProducts = allProducts.filter((product) => product.category.toLowerCase() === category);
        }

        // search
        if (search) {
            search = search.toLowerCase().replace(/-/g, " ");;
            filteredProducts = filteredProducts.filter((product) => product.title.toLowerCase().includes(search));
        }
        //filter by price
        if (minPrice && maxPrice) {
            filteredProducts = filteredProducts.filter((product) => {
                return (product.price >= Number(minPrice) && product.price <= Number(maxPrice));
            });
        }

        if (sort === 'asc') {
            filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        }
        if (sort === 'desc') {
            filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        }

        return res.status(200).json(filteredProducts);
    } catch (error) {
        return res.status(500).json({
            message: 'server error'
        })
    }
}

const addProduct = async (req, res) => {
    try {
        let { title, price, category, stock, brand, description, image } = req.body;
        price = Number(price);
        stock = Number(stock);
        if (!title || !title.trim()) {
            return res.status(400).json({
                message: 'Title is required'
            });
        }
        if (isNaN(price)) {
            return res.status(400).json({
                message: 'price is required'
            });
        }
        else if (isNaN(price)) {
            return res.status(400).json({
                message: 'price must be number'
            });
        }
        else if (price < 0) {
            return res.status(400).json({
                message: 'price must be positive'
            })
        }
        //category checking
        const allCategories = ['mobile', 'electronics', 'laptop', 'fashion', 'footwear'];
        if (!category || !category.trim()) {
            return res.status(400).json({
                message: 'category is required'
            });
        }
        else if (!(allCategories.includes(category.toLowerCase()))) {
            return res.status(400).json({
                message: 'Invalid category'
            });
        }

        //stock checking
        if (isNaN(stock)) {
            return res.status(400).json({
                message: 'Stock is required'
            });
        }
        else if (isNaN(stock)) {
            return res.status(400).json({
                message: 'stock must be number'
            })
        }
        else if (stock < 0) {
            return res.status(400).json({
                message: 'stock must be postive'
            })
        }
        const allProducts = await readFileData('products.json');
        // checking for duplicate products
        const isExisting = allProducts.find((product) => product.title.toLowerCase()===title.toLowerCase());
        if (isExisting) {
            return res.status(409).json({
                message: 'Product is already exist'
            })
        }
        const newProduct = {
            id:'P'+Date.now(),
            title: title.toLowerCase(),
            price: price,
            category: category.toLowerCase(),
            stock:stock,
            brand: brand,
            description: description,
            image: image

        };
        allProducts.push(newProduct);
        await writeFileData('products.json',allProducts);
        return res.status(201).json({
            message: 'product added successfully'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'server error'
        })
    }
}



//delete the product
const deleteProduct=async(req,res)=>{
    try{
        const id=req.params.id;
        const allProducts=await readFileData('products.json');
        const isExisting=allProducts.find((product)=>product.id===id)
        if(!isExisting){
            return res.status(404).json({
                message:'product does not exists'
            });
        }
        const afterDeleteProducts=allProducts.filter((product)=>product.id!==id);
        await writeFileData('products.json',afterDeleteProducts);
        return res.status(200).json({
            message:'product deleted successfully'
        });
    }catch(error){
        return res.status(500).json({
            message:'server error'
        })
    }
}


const updateProduct=async(req,res)=>{
     try {
        let { id,title, price, category, stock, brand, description, image } = req.body;
        price = Number(price);
        stock = Number(stock);
        if (!title || !title.trim()) {
            return res.status(400).json({
                message: 'Title is required'
            });
        }
        if (isNaN(price)) {
            return res.status(400).json({
                message: 'price is required'
            });
        }
        else if (isNaN(price)) {
            return res.status(400).json({
                message: 'price must be number'
            });
        }
        else if (price < 0) {
            return res.status(400).json({
                message: 'price must be positive'
            })
        }
        //category checking
        const allCategories = ['mobile', 'electronics', 'laptop', 'fashion', 'footwear'];
        if (!category || !category.trim()) {
            return res.status(400).json({
                message: 'category is required'
            });
        }
        else if (!(allCategories.includes(category.toLowerCase()))) {
            return res.status(400).json({
                message: 'Invalid category'
            });
        }

        //stock checking
        if (isNaN(stock)) {
            return res.status(400).json({
                message: 'Stock is required'
            });
        }
        else if (isNaN(stock)) {
            return res.status(400).json({
                message: 'stock must be number'
            })
        }
        else if (stock < 0) {
            return res.status(400).json({
                message: 'stock must be postive'
            })
        }
        const allProducts = await readFileData('products.json');
        //checking the product is exist or not
        const isExisting=allProducts.find((product)=>product.id===id);
        console.log(isExisting)
        if(!isExisting){
            return res.status(404).json({
                message:'product doesnot exit'
            });
        }
            const updatedProduct = {
            id:id,
            title: title.toLowerCase(),
            price: price,
            category: category.toLowerCase(),
            stock:stock,
            brand: brand,
            description: description,
            image: image

        };
        const afterUpdateProducts=allProducts.map((product)=>{
            if(product.id===id){
                return updatedProduct;
            }
            return product;
        });
        await writeFileData('products.json',afterUpdateProducts);
        return res.status(200).json({
            message:'product updated successfully'
        }); 
}catch(error){
    return res.status(500).json({
        message:'server error'
    })
}
}

export {addProduct,getAllProducts,deleteProduct,updateProduct};