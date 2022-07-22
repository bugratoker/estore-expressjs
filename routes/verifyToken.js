const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{

    const authHeader = req.headers.token
    if(authHeader){
        const token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_KEY,(err,something)=>{

            if(err){
                res.status(401).json('you are not authenticated')
            }

            req.something=something;
            console.log(something)
            next();

        })
    }else{
        res.status(401).json('you are not authenticated')
    }


}

const verifyTokenAndAuth = (req,res,next)=>{

    verifyToken(req,res,()=>{
        if(req.something.id === req.params.id || req.something.isAdmin){

            next();
        }else{
            res.status(403).json('you are not allowed')
        }
    })
    
}
const verifyTokenAndAdmin = (req,res,next)=>{

    verifyToken(req,res,()=>{
        if(req.something.isAdmin){

            next();
        }else{
            res.status(403).json('you are not allowed')
        }
    })
    
}

module.exports = {verifyToken , verifyTokenAndAuth,verifyTokenAndAdmin}
  /*
  something : payload of jwt
  {
  id: '62d4943add97193463b76c0f',
  isAdmin: false,
  bugra: 'yes',
  iat: 1658329936,
  exp: 1658416336}
  */