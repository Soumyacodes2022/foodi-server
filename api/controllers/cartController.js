const Carts = require("../model/carts")

//get carts using email
const getCartByEmail = async(req,res)=>{
    try {
    const email = req.query.email;
    const query = {email:email};
    const result = await Carts.find(query).exec();
    res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//post a cart item to cart page when add-to-cart btn is clicked
const postAddToCart = async(req,res)=>{
    const {menuItemId, name, recipe, image, price, quantity, email} = req.body;
    try {
        const existingcart = await Carts.findOne({menuItemId,email});
        if(existingcart){
           return res.status(400).json({message: "Item already added to the Cart.", failedData:"Failed to add this item again!"})
        }
        const cartItem = await Carts.create({
            menuItemId, name, recipe, image, price, quantity, email
        })
        res.status(201).json( {message:cartItem, createdData: "Data Added to the cart"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//delete a cart item
const deleteCartItem = async(req,res)=>{
    const id = req.params.id;
    try {
        const deletedCart = await Carts.findByIdAndDelete(id)
        if(!deletedCart){
            return res.status(400).json({message:"cart item not found"})
        }
        res.status(200).json({message:"Cart Item removed successfully", deletedCount:1})
    } catch (error) {
        res.status(500).json({mesage:error.message})
    }
}

//deleteAll cartItem
const deleteAllCartItems = async(req,res)=>{
    try {
        const deleteAllCart = await Carts.deleteMany({});
        if(!deleteAllCart){
            return res.status(400).json({message:"cart item not found"})
        }
        res.status(200).json({message:"Cart Item removed successfully", deletedAllCart:true})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//update cart items
const updateCartItems = async(req,res)=>{
    const cartId = req.params.id;
    const {menuItemId, name, recipe, image, price, quantity, email} = req.body;
    try {
        const updateCart = await Carts.findByIdAndUpdate(cartId,{menuItemId, name, recipe, image, price, quantity, email},{new:true,runValidators:true})
        if(!updateCart){
            return res.status(404).json({message:"Cart Item not Found!"})
        }
        res.status(200).json(updateCart)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//get single cart item
const getSingleCart = async(req,res)=> {
    const cartId = req.params.id;
    try {
        const cartItem = await Carts.findById(cartId);
        res.status(200).json(cartItem)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports = {
    getCartByEmail,
    postAddToCart,
    deleteCartItem,
    deleteAllCartItems,
    updateCartItems,
    getSingleCart
}