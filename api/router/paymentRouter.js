const express = require('express');
const router = express.Router();  


//token
const paymentController = require('../controllers/paymentController');
const verifyToken = require('../middleware/verifyToken');

//post payment infomations to db
router.post('/',verifyToken, paymentController.paymentControl);
router.get('/',verifyToken, paymentController.getPaymentDetails);

module.exports = router;