const router = require('express').Router()
const User= require('../models/User')
var CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

router.post("/register",async(req,res)=>{
    console.log("here")
    const newUser = new User({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.SEC_KEY).toString(),
        email: req.body.email
    })

    try{

        const user = await newUser.save()
        res.status(201).json(user)

    }catch(err){

        res.status(500).json(err)
    }
    

})
router.post('/login',async(req,res)=>{

    const user = await User.findOne({username:req.body.username})

    !user && res.status(401).json('wrong credentials!')
    // this one is required -> .toString(CryptoJS.enc.Utf8)
    hashedPass = CryptoJS.AES.decrypt(user.password, process.env.SEC_KEY).toString(CryptoJS.enc.Utf8);
    
    const JWT = jwt.sign({
        id:user._id,
        isAdmin:user.isAdmin,
        bugra:"yes"
        //payload part of JWT 
    },process.env.JWT_KEY,
    {expiresIn:"1d"})
    
    hashedPass !== req.body.password && res.status(401).json('wrong pass')

    //this one just for hiding password from json also we add ._doc 
    //because there are other unnecessary things ._doc pure data
    const {password, ...others} = user._doc
    res.status(200).json({...others,JWT})

})


module.exports = router