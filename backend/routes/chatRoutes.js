const express=require("express");
const router=express.Router();

const authMiddleware=require ("../middleware/autMiddleware");
const {sendMessage,getMessage}=require("../controllers/chatcontroller")

// @route   GET /api/chat/test
// @desc    Test chat route
// @access  Public
router.get("/test",(req,res)=>{
    res.send("chat route working!");
});

//protected routes
// @route   POST /api/chat/send
// @desc    Send a message
// @access  Private (Requires Token)
router.post("/send",authMiddleware,sendMessage);

// @route   GET /api/chat/history/:userId
// @desc    Get chat history with selected user
// @access  Private (Requires Token)
router.get("/history/:userId",authMiddleware,getMessage);

module.exports =router;



