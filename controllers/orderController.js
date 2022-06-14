const Product=require('../models/Order')
const {StatusCodes}=require('http-status-codes')
const CustomError=require('../errors')


const getAllOrders= async (req,res)=>{
    res.send('get all orders')
}

const getSingleOrder= async (req,res)=>{
    res.send('get single order')
}

const getCurrentUserOrders= async (req,res)=>{
    res.send('get current order')
}

const createOrder= async (req,res)=>{
    res.send('create orders')
}

const updateOrder= async (req,res)=>{
    res.send('update orders')
}

module.exports={
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
};