require('dotenv').config();
require('express-async-errors')

const express= require('express')
const app= express()

app.use(express.json())
//database

const connectDB=require('./db/connect')
//middleware
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware= require('./middleware/error-handler')

app.get('/',(req,res)=>{
    res.send('e-commerce-api')
})

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