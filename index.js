 const express = require('express');
 const mongoose = require('mongoose');
 const verifyToken = require('./api/middleware/verifyToken')
 const jwt = require('jsonwebtoken')
 const cors = require('cors');
 const app = express();
 const port = process.env.PORT || 3000;
 const bodyParser = require('body-parser');

app.use(bodyParser.json());
 require('dotenv').config();
 //middleware
 app.use(cors());
 app.use(express.json());

 
 //mongoDB connect using Mongoose
 //UserName: flash_743977
 //Password:  8YZiUL9HbdlkwqkY
 

 mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@foodie-cluster.ipahdoh.mongodb.net/`).then(console.log("Mongoose Connected Successfully.")).catch(error=>console.log(error));



 //jwt authentication
 app.post('/jwt',async(req,res)=>{
   const user = req.body;
   const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN,{
      expiresIn: '1hr'
   })
   res.send({token})
 })


 

 //receive routes here
 const menuRoutes = require('./api/router/menuRouter')
 const cartRoutes = require('./api/router/cartRouter')
 const userRoutes = require('./api/router/userRoutes')
 const paymentRoutes = require('./api/router/paymentRouter')
 app.use('/menu', menuRoutes)
 app.use('/carts',cartRoutes )
 app.use('/users',userRoutes)
 app.use('/payments',paymentRoutes)


 //stripe payment route
 app.post("/create-payment-intent", async (req, res) => {
   const { price } = req.body;
   const amount = price*80;
 
  //STRIPE AUTHENTICATION API_KEY
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

   // Create a PaymentIntent with the order amount and currency
   const paymentIntent = await stripe.paymentIntents.create({
     amount: amount,
     currency: "inr",
     payment_method_types: ["card"],
     description:'Software Development Services',
   });
 
   res.send({
     clientSecret: paymentIntent.client_secret,
   });
 });




 app.get('/', verifyToken, (req,res)=>{
    res.send("Hello World!")
 })

 app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
 })