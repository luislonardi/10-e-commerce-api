const User=require('../models/User');
const {StatusCodes}= require('http-status-codes');
const CustomError=require('../errors');
const {attachCookiesToResponse,createTokenUser}= require('../utils')



const register= async (req,res)=>{
    const {email}=req.body;

    const emailAlreadyExists= await User.findOne({email})
    
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError(`Email: ${emailAlreadyExists.email} already exists`)
    }
    const user= await User.create(req.body);
    const tokenUser=createTokenUser(user)
    attachCookiesToResponse(res,tokenUser)
    res.status(StatusCodes.CREATED).json({user:tokenUser});
    
  }

const login= async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw new CustomError.BadRequestError(
            'Please provide email and password')
    }
    const user=await User.findOne({email})
        if(!user){
            throw new CustomError.UnauthenticatedError(
                'invalid credentials')
       }
    const isPasswordCorrect=await user.comparePassword(password)
       if(!isPasswordCorrect){
           throw new CustomError.UnauthenticatedError(
            'invalid credentials')
    }
    
    const tokenUser=createTokenUser(user)
    

    attachCookiesToResponse(res,tokenUser)
     res.status(StatusCodes.OK).json({user:tokenUser});
}
const logout= async (req,res)=>{
    //le ponemos un valor ficticio cualquiera y seteamos el expires
    res.cookie('token','cualquiera',{
        httpOnly:true,
        expires: new Date(Date.now()+ 5*1000),
    })
    res.status(StatusCodes.OK).json({msg:'logged out'})

}
    module.exports= {
        register,
        login,
        logout,
    };