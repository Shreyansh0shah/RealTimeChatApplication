const router=require('express').Router();
const {signup,login}=require("../controllers/authcontroller");

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post("/login",login);

// @route   POST /api/auth/login
// @desc    Login user & return token
// @access  Public
router.post("/signup",signup);

// @route   GET /api/auth/test
// @desc    Test authentication route
// @access  Public
router.get("/test",(req,res)=>{
    res.send("Auth route working!");
});

module.exports =router;