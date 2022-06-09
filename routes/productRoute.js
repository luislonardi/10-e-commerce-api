const express= require('express');
const router= express.Router();
const {authenticateUser,authorizePermissions}= require('../middleware/authentication')

const{
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}= require('../controllers/productController')



module.exports= router