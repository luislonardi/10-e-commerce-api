const Product=require('../models/Product')
const {StatusCodes}=require('http-status-codes')
const CustomError=require('../errors')
//const {}=require('')

const createProduct= async (req,res)=>{
    req.body.user=req.user.userId;
    const product= await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({product})
  };

const getAllProducts= async (req,res)=>{
    const products= await Product.find({})
    if(!products){
        throw new CustomError.NotFoundError(`No products`)
    }
    res.status(StatusCodes.OK).json({products,count:products.length})
    
};

const getSingleProduct= async (req,res)=>{
    const product= await Product.findOne({_id:req.params.id})
    if(!product){
        throw new CustomError.NotFoundError(`No product with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({product})
    
};

const updateProduct= async (req,res)=>{
   const {id:productId}=req.params;
   const product=await Product.findOneAndUpdate({_id:productId},req.body,{
    new:true,
    runValidators:true,
   }); 
   if(!product){
    throw new CustomError.NotFoundError(`No product with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({product})
};

const deleteProduct= async (req,res)=>{
    const {id:productId}=req.params;
   const product=await Product.findOne({_id:productId}); 
   if(!product){
    throw new CustomError.NotFoundError(`No product with id: ${req.params.id}`)
    }
    await product.remove();
    res.status(StatusCodes.OK).json({msg:'Success! Product Removed'})

    //res.send('delete product')
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