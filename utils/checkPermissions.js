const CustomError= require('../errors')

const checkPermissions=(requestUser,resourceUserId)=>{
    
   //console.log(requestUser);
   //console.log(resourceUserId); //this is an object
   //console.log(typeof resourceUserId) 
   if(requestUser.role==='admin') return
   if(requestUser.userId===resourceUserId.toString())return 
   //to string is because resourceId is an object
   throw new CustomError.UnauthorizedError('Not authorized to access this route')
}


module.exports= checkPermissions