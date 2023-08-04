import JWT from 'jsonwebtoken';
import userModel from '../models/userModels.js';

//protected routes token base

export const requireSignIn = async (req,res,next)=>{
    try{const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user =decode;
    next()
}catch(error){
 console.log(error)
 res.status(401).send({
    success:false,
    message:"error in signIn middleware"
})
}}

export const isAdmin = async(req,res,next)=>{
try {
    const user = await userModel.findById(req.user._id)
        if(user.role !==1){
        return res.status(401).send({
            success:false,
            message:"UnAuthorized Access"
        })
        }else{
            next()
        }

    }
catch (error) {
    console.log(error);
    res.status(401).send({
        success:false,
        message:"error in admin middleware"
    })
}
}