const CustomError=require('../errors')
const {isTokenValid}=require('../utils')

//req.signedCookies.nombreDeLaCookie
//este metodo llama la cookie y verifica que los datos del payload sean validos
// ya que el payload esta formado por name,userId y role

const authenticateUser=async (req,res,next)=>{
    const token=req.signedCookies.token;
    if(!token){
        throw new CustomError.UnauthenticatedError("Authentication Invalid") 
    }
    try {
      const {name,userId,role}=isTokenValid({token})
      req.user={name,userId,role}
      next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError("Authentication Invalid") 
    }
   }
// ...roles es como parametro rest ...rest le podes poner la cantidad de params que quieras
const authorizePermissions=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError(
                'Unauthorized to access this route'
            )
        }
    next()    
    }
    }


module.exports= {
    authenticateUser,
    authorizePermissions
}