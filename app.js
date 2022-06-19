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
const rateLimiter=require('express-rate-limit')
const helmet=require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize= require('express-mongo-sanitize')

app.use(express.static('./public'))
app.use(fileUpload())
//database
const connectDB=require('./db/connect');
//router
const authRouter=require('./routes/authRoutes');
const userRouter=require('./routes/userRoutes');
const productRouter=require('./routes/productRoute')
const reviewRouter=require('./routes/reviewRoutes')
const orderRouter=require('./routes/orderRouter')

const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware= require('./middleware/error-handler');
//const { options } = require('joi');
app.set('trust proxy',1)
app.use(rateLimiter({
    windowMs:15 *60 *1000,
    max:60,
}))

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());


app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/reviews',reviewRouter)
app.use('/api/v1/orders',orderRouter)

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