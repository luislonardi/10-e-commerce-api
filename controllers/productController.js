const Product=require('../models/Product')
const {StatusCodes}=require('http-status-codes')
const CustomError=require('../errors')
const path=require('path') //for moving the image to public/uploads


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
};

const uploadImage= async (req,res)=>{
    //size and mimetype comes in the req.files object.
    //to check them use console.log(req.files) an verify the properties
    console.log(req.files)
    if(!req.files){
        throw new CustomError.BadRequestError('No file uploaded')
    }
    const productImage=req.files.image;
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('Please upload an image')
       }
    const maxSize= 1024*1024;
    if(productImage.size>maxSize){
        throw new CustomError.BadRequestError('Please upload an image smaller than 1 MB')    
    }
    
    const imagePath= path.join(__dirname,'../public/uploads/' + `${productImage.name}`)
    await productImage.mv(imagePath)
    res.status(StatusCodes.OK).json({image:`/uploads/${productImage.name}`})
    //res.send('Upload image')
};

module.exports={
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}