const express = require('express')
const app = express()
const port = 3000
const authRouter = require('../routes/auth')
app.use('/api/v1',authRouter)

//app.use('/customer',customer)
//use the customer.js file to handle endpoints
// that starts vith /customer 

// have to define listen function
app.listen(port,()=>{
    console.log(`port ${port} listening`);
})