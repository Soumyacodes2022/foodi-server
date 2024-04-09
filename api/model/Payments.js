const mongoose = require('mongoose');
const {Schema} = mongoose;

//Create Mongoose Schema for payment
const paymentSchema = new Schema({
    name: String,
    email: String,
    transactionid: String,
    price: Number,
    quantity: Number,
    status: String,
    itemName: Array,
    cartItems: Array,
    menuItems: Array,
    createdAt:{
        type:Date,
        default: Date.now()
    }
})

//Create Model
const Payments = mongoose.model("Payments" , paymentSchema)
module.exports = Payments;
