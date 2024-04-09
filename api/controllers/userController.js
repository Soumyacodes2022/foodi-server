const jwt = require('jsonwebtoken');
const User = require('../model/User');

//get an user
const getUser = async(req,res)=> {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//create an user
const createUser = async(req,res) => {
    const user = req.body;
    const query = {email : user.email};
    try {
        const existingUser = await User.findOne(query);
        if(existingUser){
            return res.status(302).json({message:"User Already Exist"});
        }
        const result = await User.create(user);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//delete an user
const deleteUser = async(req,res)=> {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(deletedUser)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//get admin
const getAdmin = async(req,res)=> {
    const email = req.params.email;
    const query = {email:email};
    try {
        const user = await User.findOne(query);
        const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
    req.decoded = decoded;
        if(email !== req.decoded.email){
            return res.status(403).send({message: "Forbidden Access"})
        }
        let admin = false;
        if(user){
            admin = user?.role === "admin";
        }
        res.status(200).json({admin})
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//make an user as admin
const makeAdmin = async(req,res)=> {
    const userId = req.params.id;
    try {
        const updatedData = await User.findByIdAndUpdate(
            userId, 
            {role:"admin"},
            {new:true, runValidators:true}
        )
        if(!updatedData){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(updatedData)

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}





module.exports = {
    getUser,
    createUser,
    deleteUser,
    getAdmin,
    makeAdmin
}