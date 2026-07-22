import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
    const existingUser = User.findOne({email});
    if(!existingUser){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    const user = await User.create({
        name,email,password:hashedPassword
    });
    return res.status(201).json({
        message:"User Registered Successful"
    });
    }catch(error){
       return res.status(400).json({
            message : error.message || "Registration Failed"
        })
    }
};


export const loginUser = async(req,res)=>{
    try{
       const { email,password } = req.body;
       const user = await User.findOne({email});
       if(!user){
         return res.status(401).json({
            message:"Invalid Email or Password"
         });
       }
       const comparePassword = await bcrypt.compare(password,user.password);
       if(!comparePassword){
         return res.status(401).json({
            message:"Invalid Email or Password"
         })
       }

    const token = jwt.sign(
        {id : user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
       );
       
      res.status(200).json({
        message:"Login Successful",token,
        user:{
            id:user._id,name:user.name,email:user.email
        }
      })
    }catch(error){
        return res.status(400).json({
            message:error.message || "Login Failed"
        });
    }
   
};