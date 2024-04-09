const jwt = require('jsonwebtoken');
const User = require('../model/User');
const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
    req.decoded = decoded;
    const email = req.decoded.email;
    const query ={email: email};

    const user = await User.findOne(query);
    const isAdmin = user?.role == "admin";

    if(!isAdmin){
        return res.status(403).send({message: "forbidden access!"})
    }

    next();
    } catch (error) {
        res.status(401).json({message:"Unauthorized"})
    }
    
};

module.exports = verifyAdmin;