const jwt=require('jsonwebtoken');
require("dotenv").config();
const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        const decoded=jwt.verify(token,'sumit')
        if(decoded){
            // console.log(decoded)
            const userID=decoded.userId
            req.body.userId=userID
            console.log(req.body)
            next()
        }else{
            res.send("please login first")
        }
    }else{
        res.send("please login")
    }
}

module.exports = authenticate