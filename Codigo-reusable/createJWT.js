const createJWT=(user)=>{
    console.log("el JWT es del payload",user)
    const token= jwt.sign(user,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME
    })
  return token;  
}
// sign es la funcion que usa la libreria JWT para crear un token. return token nos devuelve el token completo
// process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME} ambas variables se configuran en .env