const jwt=require('jsonwebtoken');

const createJWT=(user)=>{
    console.log("el JWT es del payload",user)
    const token= jwt.sign(user,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME
    })
  return token;  
}

const isTokenValid= (token)=> jwt.verify(token,process.env.JWT_SECRET);


const attachCookiesToResponse=(res,tokenUser)=>{
    
    const token=createJWT(tokenUser)
    
    const oneDay=1000 * 60*60*24

    res.cookie('token',token,{
        httpOnly:true,
        expires:new Date(Date.now()+oneDay),
        secure:process.env.NODE_ENV==='production',
        signed:true
    })
    console.log(res)
    
}

module.exports={
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
}
