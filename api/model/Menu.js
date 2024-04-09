const mongoose = require('mongoose');
const {Schema} = mongoose;

// Create Mongoose Schema for Menu
const menuSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        minLength: 3
    },
    recipe: String,
    image: String,
    category: String,
    price: Number ,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

// Create Model and Export
const Menu = mongoose.model("Menu", menuSchema)
module.exports = Menu;