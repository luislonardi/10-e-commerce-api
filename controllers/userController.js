const User=require('../models/User')
const {StatusCodes}=require('http-status-codes')
const CustomErrors=require('../errors')
const {attachCookiesToResponse}=require('../utils')

const getAllUsers= async (req,res)=>{
    const user= await User.find({})
    res.status(StatusCodes.OK).json({resultado:user})
//res.send('Get all users route')
}

const getSingleUser= async (req,res)=>{
    res.send('Get Single user route')
    }

const showCurrentUser= async (req,res)=>{
        res.send('show current user route')
        }

const updateUser= async (req,res)=>{
     res.send('Update user  route')
        }
const updateUserPassword= async (req,res)=>{
    res.send('Update user password')
     }            

module.exports={
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}            