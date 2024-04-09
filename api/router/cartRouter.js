const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController')
const verifyToken = require('../middleware/verifyToken')
//route the cart-items
router.get('/',verifyToken, cartController.getCartByEmail);
router.post('/', cartController.postAddToCart);
router.delete('/:id',cartController.deleteCartItem)
router.delete('/',cartController.deleteAllCartItems)
router.put('/:id',cartController.updateCartItems)
router.get('/:id',cartController.getSingleCart)


module.exports = router