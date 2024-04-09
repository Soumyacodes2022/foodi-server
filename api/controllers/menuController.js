const Menu = require('../model/Menu');

const getAllMenuItems = async(req,res)=>{
    try {
        const menus = await Menu.find({}).sort({createdAt: -1});
        res.status(200).json(menus)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
}

const postNewMenuItem = async(req,res)=> {
    const newItem = req.body;
    try {

        const result = await Menu.create(newItem);
        res.status(200).json(result);
        
    } catch (error) {
    
        res.status(500).json({message: error.message})
        
    }
}

const deleteMenuItem = async(req,res) => {
    const menuId = req.params.id;
    try {
        const deleteItem = await Menu.findByIdAndDelete(menuId);
        if(!deleteItem){
            return res.status(400).json({message:"MenuItem Not Found"});
        }
        res.status(200).json(deleteItem)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

const getSingleMenuItem = async(req,res) => {
    const menuId = req.params.id;
    try {
        const getItem = await Menu.findById(menuId);
        res.status(200).json(getItem)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}

const updateMenuItem = async(req,res) => {
    const menuId = req.params.id;
    const {_id,name,recipe,image,category,price} = req.body;
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(menuId , {_id,name,recipe,image,category,price} , {
            new: true,
            runValidators:true
        })
        if(!updatedMenu) {
            return res.status(404).json({message:"Menu Item not found."})
        }
        res.status(200).json(updatedMenu)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports={
    getAllMenuItems,
    postNewMenuItem,
    deleteMenuItem,
    getSingleMenuItem,
    updateMenuItem
}