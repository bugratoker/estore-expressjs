const router = require('express').Router();
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
//GET BY USER ID
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