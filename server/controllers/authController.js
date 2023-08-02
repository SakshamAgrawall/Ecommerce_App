import userModel from '../models/userModels.js'
import {  hashPassword,comparePassword } from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken';

export const registerController = async(req,res) =>{
try {
    const {name,email,password,phone,address} = req.body
    if(!name){
        return res.send({error:'Name is Required'})
    }
    if(!email){
        return res.send({error:'email is Required'})
    }
    if(!password){
        return res.send({error:'password is Required'})
    }
    if(!phone){
        return res.send({error:'phone no is Required'})
    }
    if(!address){
        return res.send({error:'address is Required'})
    }
   
    //existing user
    const existingUser = await userModel.findOne({email});

    if(existingUser){
        return res.status(200).send({success:true,message:'Already Register please Login',})
    }

    //register user
    const hashedPassowrd = await hashPassword(password)
    //save
    const user = await new userModel({name,email,phone,address,password:hashedPassowrd}).save()

    res.status(200).send({
        success:true,
        message:"user register Successfully",
        user
    })



} catch (error) {
    console.log(error)
 res.status(500).send({
        success: false,
        message:'error in register',
        error
    })
}
}


export const loginController = async (req,res) => {
          try {
            const { email,password } = req.body
            // validation
            if(!email || !password){
                return res.status(404).send({success:false,message:'invalid Data'})
            }

            //check user
            let user = await userModel.findOne({email})
            if(!user){
                return res.status(404).send({success:false,message:"email not register"})
            }
            const match = await comparePassword(password,user.password);

            if(!match){
                return res.status(404).send({
                    success:false,
                    message:"password not Matched"
                })
            }

            //token 
            const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
                expiresIn:'7d',
            });
         res.status(200).send({
            success:true,
            message:"login SuccessFully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                Address:user.address
            },
            token,
         })

          } catch (error) {
            console.log(error)
 res.status(500).send({
        success: false,
        message:'error in login',
        error
    })
          }
}

export const testController= (req,res)=>{
res.send('protecte route')
} 