const User = require('../models/User');
const { verifyTokenAndAuth, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();

router.put('/:id',verifyTokenAndAuth,async(req,res)=>{

    
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(req.body.password,process.env.SEC_KEY).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new :true})
        res.status(200).json(updatedUser)

    }catch(err){
        res.status(500).json(err)
    }

    

})

router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{

    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(deletedUser){
            res.status(200).json(deletedUser)
        }else{
            res.status(500).json(`no such users with id : ${req.params.id}`)
        }
    }catch(err){
        res.status(500).json(err)
    }

})
router.get("/:id",verifyTokenAndAdmin,async(req,res)=>{

    try{
        const user = await User.findById(req.params.id)
        if(user){

            const {password,...others} = user._doc
            res.status(200).json(others)
        }
    }catch(err){
        res.status(500).json(err)
    }

})
router.get("/",verifyTokenAndAdmin,async(req,res)=>{

    try{
        
        const users= await User.find()
        res.status(200).json(users)


    }catch(err){


    }
})


module.exports = router