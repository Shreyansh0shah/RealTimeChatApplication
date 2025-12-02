//const router=require('express').Router();
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const bcrypt=require("bcrypt");

// -------------------- SIGNUP --------------------
//checking this branch
exports.signup= async (req,res)=>{
    console.log("SIGNUP ROUTE REACHED:", req.method, req.body);

    try{
        const {username,email,password}=req.body;

        //Check if all fields provided
        if(!username||!email||!password){
            return res.status(400).json({"message":"All filds are required1"});
        }

        //check email alreayd exists 
        const existingUser= await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({"message":"Email already exists"});
        }
        //encript password
        const hashedPassword =await bcrypt.hash(password,10);

        //create new user 
        const newUser=new User({
            username,email,password:hashedPassword
        });


        await newUser.save();

        //return success
        return res.status(201).json({"message":"Registration successfully"});
    }catch(error){
        return res.status(500).json({message:"Signup failed",error:error.message});

    }
};

// -------------------- LOGIN --------------------
exports.login= async (req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email||!password){
            debugger;
            return res.status(400).json({"message":"Email and password required"})
        }
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({message:"Password not matched"})
        }

        //Generate JWT Token
        const token = jwt.sign(
            {userId:user._id},
        process.env.JWT_SECRET,
         {expiresIn:"7d"}
        );

        //send responce 
        res.json({
            message:"Login Successfull",
            token:token,
            userId:user._id
        });

    }catch(error){
        return res.status(500).json({message:"Login failed",error:error.message});
        
    }
}

