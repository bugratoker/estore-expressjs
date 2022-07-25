const   router = require('express').Router();
const Order = require('../models/Order');
const { verifyTokenAndAuth,verifyTokenAndAdmin } = require('./verifyToken');

//CREATE ORDER
router.post("/",verifyTokenAndAuth,async(req,res)=>{

    const newOrder = new Order(req.body)    
    try{
        const Order = await newOrder.save()
        res.status(201).json(Order)

    }catch(err){

        res.status(500).json(err)
    }
})

//GET MONTHLY INCOME
router.get("/income",verifyTokenAndAdmin,async(req,res)=>{
    console.log("asdsa")
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1)) // june
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1)) //may
    

    
    try{

        
        const income = await Order.aggregate([
            
            {$match:{createdAt:{$gte:previousMonth}}},
            {$project:{month:{$month:"$createdAt"},sales:("$amount")}},
           
            {$group:{_id:"$month",total:{$sum:"$sales"}}}
             // Each `_id` must be unique, so if there are multiple
            // months with the same name, sum = sum + sales sql = group by [_id]
            // { $match: { "continent": { $in: ["North America", "Asia"] } } }
            //{ $sort: { "population": -1 } } -> descending order
        ]);
        res.status(200).json(income)

    }catch(err){
        res.status(500).json(err)

    }


})

//get - /: olan get -"/income"dan altta olmalı yoksa onu anlar
//GET BY USERID
router.get("/:userId",verifyTokenAndAuth,async(req,res)=>{

    try{
            const order = await Order.findOne({userId:req.params.userId})
            res.status(200).json(order);
    }catch(err){
        res.status(500).json(err)
    }

})

//GET ALL
router.get("/",verifyTokenAndAdmin,async(req,res)=>{

    try{
            const orders = await Order.find()
            res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err)
    }

})
//UPDATE ORDER
router.put('/:userId',verifyTokenAndAuth,async(req,res)=>{
    //{$set:req.body} whatever you sent in body it will be updated
    try{
        //what is the meaning of {new:true} ??
        const updatedOrder = await Order.findByIdAndUpdate(req.params.userId,{$set:req.body},{new:true})
        res.status(200).json(updatedOrder)
    }catch(err){

        res.status(500).json(err)
    }

})
//DELETE ORDER
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{

    try{
        const deletedOrder = await Order.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedOrder)
    }catch(err){
        res.status(500).json(err)
    }

})


module.exports = router