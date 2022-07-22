const router = require('express').Router();
const Cart = require('../models/Cart')

//CREATE CART
router.post("/",verifyTokenAndAuth,async(req,res)=>{

    const newCart = new Cart(req.body)   
    try{
        const Cart = await newCart.save()
        res.status(201).json(Cart)

    }catch(err){

        res.status(500).json(err)
    }
})
//GET BY USER ID
router.get("/:userId",verifyTokenAndAuth,async(req,res)=>{

    try{
            const cart = await Cart.findOne({userId:req.params.userId})
            res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err)
    }

})
//GET ALL
router.get("/",verifyTokenAndAdmin,async(req,res)=>{

    try{
            const carts = await Cart.find()
            res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err)
    }

})
//UPDATE CART
router.put('/:userId',verifyTokenAndAuth,async(req,res)=>{
    //{$set:req.body} whatever you sent in body it will be updated
    try{
        //what is the meaning of {new:true} ??
        const updatedCart = await Cart.findByIdAndUpdate(req.params.userId,{$set:req.body},{new:true})
        res.status(200).json(updatedCart)
    }catch(err){

        res.status(500).json(err)
    }

})


module.exports = router