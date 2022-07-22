const express = require('express')
const app = express()
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
//dotenv helps to encrypt any secret key
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//have to use this middleware to post json data
app.use(express.json())
//user(s) some kinda rule
app.use('/api/v1/users',userRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/products',productRouter)
dotenv.config()
mongoose.connect(process.env.MONGO_DB)
    .then(()=>{console.log("connection succesful")})
    .catch((err)=>console.log(err));



app.listen(3000,()=>{
    console.log('backend server listening');
})