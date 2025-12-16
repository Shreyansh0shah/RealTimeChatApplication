const express=require("express");
const router=express.Router();
const aiMiddleware = require("../middleware/aiMiddleware");
const authMiddleware=require ("../middleware/authMiddleware");
const {sendMessage,getMessage, markMessageDelivered,
  markMessageRead}=require("../controllers/chatcontroller")

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
router.post("/send",authMiddleware,aiMiddleware,sendMessage);

// @route   GET /api/chat/history/:userId
// @desc    Get chat history with selected user
// @access  Private (Requires Token)
router.get("/history/:userId",authMiddleware,getMessage);


// New: Manual HTTP endpoints (also used if needed)
router.patch("/status/delivered", authMiddleware, markMessageDelivered);
router.patch("/status/read", authMiddleware, markMessageRead);

module.exports =router;



