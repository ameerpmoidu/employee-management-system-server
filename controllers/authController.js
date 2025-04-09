import { resolve } from "path";
import User from "../models/user.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()
const login = async (req,res) =>{
try{
    const {email,password} =req.body;
    const user =await User.findOne({email})
    if(!user){
        res.status(404).json({success:false,error:'user not found'})

    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        res.status(404).json({success:false,error:"wrong password"})
    }
    const token =jwt.sign({_id:user._id,role:user.role},
        process.env.JWT_KEY, {expiresIn:"10d"}
    )
    res.status(200).json({success:true,token,user:{_id:user._id,name:user.name,role:user.role}})

}catch(error){
    res.status(500).json({success:false,error:error.message})
    
}
}
const verify =(req,res) =>{
    return res.status(200).json({success: true,user: req.user})
}

export {login , verify};