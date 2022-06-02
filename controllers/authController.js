const User=require('../models/User');
const {StatusCodes}= require('http-status-codes');
const CustomError=require('../errors');
//const jwt=require('jsonwebtoken');
const {attachCookiesToResponse}= require('../utils')



const register= async (req,res)=>{
    const {email}=req.body;

    const emailAlreadyExists= await User.findOne({email})
    
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError(`Email: ${emailAlreadyExists.email} already exists`)
    }
    const user= await User.create(req.body);
    const tokenUser={name:user.name,userId:user._id,role:user.role}
    attachCookiesToResponse({res,user:tokenUser})
    res.status(StatusCodes.CREATED).json({user:tokenUser});
    console.log(req.body)
    console.log({user:tokenUser})
  }

const login= async (req,res)=>{
    res.send('login user');
}
const logout= async (req,res)=>{
    res.send('logout user');

}
    module.exports= {
        register,
        login,
        logout,
    };