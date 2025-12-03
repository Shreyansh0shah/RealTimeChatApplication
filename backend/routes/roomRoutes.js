const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/autMiddleware");

const { createRoom, joinRoom, leaveRoom } = require("../controllers/roomController");

// Create room
router.post("/create", authMiddleware, createRoom);

// Join room
router.post("/join", authMiddleware, joinRoom);

// Leave room
router.post("/leave", authMiddleware, leaveRoom);

module.exports = router;
