require('dotenv').config();
require('express-async-errors')
const morgan=require('morgan')
const cookieParser=require('cookie-parser')

const express= require('express')
const app= express()

app.use(express.json())
//database
const connectDB=require('./db/connect');
//router
const authRouter=require('./routes/authRoutes');
//middleware require
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware= require('./middleware/error-handler');
const { options } = require('joi');

//Rest of the packages
app.use(morgan('tiny'))
//read back the cookie middleware
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('e-commerce-api')
})

app.get('/api/v1',(req,res)=>{
    console.log(req.cookies)
    res.send('e-commerce-api')
})

app.use('/api/v1/auth',authRouter)

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