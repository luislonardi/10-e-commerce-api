require('dotenv').config();
require('express-async-errors')

const express= require('express')
const app= express()
//database

const connectDB=require('./db/connect')



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