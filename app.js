require('dotenv').config();
require('express-async-errors')
const morgan=require('morgan')
const cookieParser=require('cookie-parser')
const fileUpload=require('express-fileupload')

const express= require('express')
const app= express()

//Rest of the packages
app.use(morgan('tiny'))
app.use(express.json())
//read back the cookie middleware
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./public'))
app.use(fileUpload())
//database
const connectDB=require('./db/connect');
//router
const authRouter=require('./routes/authRoutes');
const userRouter=require('./routes/userRoutes');
const productRouter=require('./routes/productRoute')
const reviewRouter=require('./routes/reviewRoutes')

const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware= require('./middleware/error-handler');
//const { options } = require('joi');

app.get('/',(req,res)=>{
    res.send('e-commerce-api')
})

app.get('/api/v1',(req,res)=>{
    console.log(req.signedCookies)
    res.send('e-commerce-api')
})

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/reviews',reviewRouter)

//Errors handlers
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



console.log('E-Commerce API');
 
const port = process.env.PORT  || 5000;

const start= async ()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=> console.log(`Server listening on port: ${port}...`));
    }catch(error) {
        console.log(error)
    }
    
}
start()