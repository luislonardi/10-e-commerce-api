const Product=require('../models/Product')
const {StatusCodes}=require('http-status-codes')
const CustomError=require('../errors')

const createProduct= async (req,res)=>{
    res.send('create product')
};

const getAllProducts= async (req,res)=>{
    res.send('Get all products')
};

const getSingleProduct= async (req,res)=>{
    res.send('Get single product')
};

const updateProduct= async (req,res)=>{
    res.send('update product')
};

const deleteProduct= async (req,res)=>{
    res.send('delete product')
};

const uploadImage= async (req,res)=>{
    res.send('Upload image')
};

module.exports={
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}