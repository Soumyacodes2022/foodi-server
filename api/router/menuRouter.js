const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController')
//get all menu items
router.get('/', menuController.getAllMenuItems)
router.post('/',menuController.postNewMenuItem)
router.delete('/:id',menuController.deleteMenuItem)
router.get('/:id',menuController.getSingleMenuItem)
router.patch('/:id',menuController.updateMenuItem)
module.exports = router
