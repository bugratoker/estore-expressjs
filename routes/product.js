const Product = require('../models/Product');
const { verifyTokenAndAuth, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();

router.post("/",verifyTokenAndAuth,async(req,res)=>{

    const newProduct = new Product(req.body)    
    try{
        const Product = await newProduct.save()
        res.status(201).json(Product)

    }catch(err){

        res.status(500).json(err)
    }
})
router.get("/",verifyTokenAndAdmin,async(req,res)=>{

    try{
        //localhost:3000/api/v1/products?category=categories    
        const qCategory = req.query.category;
        let products;
        if(qCategory){

            
            products = await Product.find({categories:{$in:[qCategory]}})
            res.status(200).json(products);
        }else{

            products = await Product.find()
            res.status(200).json(products)
        }
        

    }catch(err){


    }
})
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{

    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedProduct)
    }catch(err){
        res.status(500).json(err)
    }

})


module.exports = router