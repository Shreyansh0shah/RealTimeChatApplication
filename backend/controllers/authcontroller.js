//const router=require('express').Router();
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const RefreshToken = require("../models/RefreshToken");

const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} = require("../utils/jwt");

const { sha256 } = require("../utils/hash");

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

/* -------------------- LOGIN -------------------- */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password not matched" });
        }

        // 🔹 ACCESS TOKEN (SHORT)
        const accessToken = signAccessToken({ userId: user._id });

        // 🔹 REFRESH TOKEN (LONG)
        const refreshToken = signRefreshToken({ userId: user._id });

        // 🔹 STORE HASHED REFRESH TOKEN
        await RefreshToken.create({
            user: user._id,
            tokenHash: sha256(refreshToken),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        // 🔹 SEND REFRESH TOKEN AS COOKIE
        res.cookie("rtoken", refreshToken, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "lax",
            path: "/api/auth",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            message: "Login successful",
            accessToken,
            userId: user._id
        });

    } catch (error) {
        return res.status(500).json({ message: "Login failed", error: error.message });
    }
};

/* -------------------- REFRESH TOKEN -------------------- */
exports.refresh = async (req, res) => {
    const token = req.cookies.rtoken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    let payload;
    try {
        payload = verifyRefreshToken(token);
    } catch {
        return res.status(401).json({ message: "Invalid refresh token" });
    }

    const tokenHash = sha256(token);
    const storedToken = await RefreshToken.findOne({ tokenHash });

    if (!storedToken || storedToken.revoked) {
        await RefreshToken.updateMany({ user: payload.userId }, { revoked: true });
        return res.status(401).json({ message: "Token reuse detected" });
    }

    storedToken.revoked = true;
    await storedToken.save();

    const newRefreshToken = signRefreshToken({ userId: payload.userId });
    await RefreshToken.create({
        user: payload.userId,
        tokenHash: sha256(newRefreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    const newAccessToken = signAccessToken({ userId: payload.userId });

    res.cookie("rtoken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/api/auth",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken: newAccessToken });
};


/* -------------------- LOGOUT -------------------- */
exports.logout = async (req, res) => {
    const token = req.cookies.rtoken;
    if (token) {
        await RefreshToken.findOneAndUpdate(
            { tokenHash: sha256(token) },
            { revoked: true }
        );
    }

    res.clearCookie("rtoken", { path: "/api/auth" });
    res.json({ message: "Logged out successfully" });
};