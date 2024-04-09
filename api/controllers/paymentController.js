const mongoose = require('mongoose');
const Payments = require("../model/Payments");
const cart = require('../model/carts');
const ObjectId = mongoose.Types.ObjectId;


const paymentControl = async (req, res) => {
    const payment = req.body;
    try {
      const paymentRqst = await Payments.create(payment);
  
      //delete cart items after payment
      const cartIds = payment.cartItems.map(id => new ObjectId(id))
      const deleteCartRequests = await cart.deleteMany({_id:{$in: cartIds}})
  
      res.status(200).json({paymentRqst,deleteCartRequests});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

const getPaymentDetails = async(req,res) => {
  const email = req.query.email;
  const query = {email:email};

  
  try {
    const decodedEmail = req.decoded.email;
    if(email !== decodedEmail){
      res.status(403).json({message:"Forbidden Access"})
    }
    const result = await Payments.find(query).sort({createdAt:-1}).exec();
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
  

module.exports = {
  paymentControl, 
  getPaymentDetails
};