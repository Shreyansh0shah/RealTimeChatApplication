const ChatRoom = require("../models/ChatRoom");

// ---------------- CREATE ROOM ----------------
exports.createRoom = async (req, res) => {
  try {
    const { roomName } = req.body;
    const userId = req.userId;

    if (!roomName) return res.status(400).json({ message: "Room name required" });

    const room = await ChatRoom.create({
      roomName,
      members: [userId],
      createdBy: userId
    });

    res.status(201).json({ message: "Room created", data: room });
  } catch (error) {
    res.status(500).json({ message: "Failed to create room", error: error.message });
  }
};

// ---------------- JOIN ROOM ----------------
exports.joinRoom = async (req, res) => {
  try {
    const { roomId } = req.body;
    const userId = req.userId;

    await ChatRoom.findByIdAndUpdate(roomId, {
      $addToSet: { members: userId }
    });

    res.json({ message: "Joined room" });
  } catch (error) {
    res.status(500).json({ message: "Failed to join room", error: error.message });
  }
};

// ---------------- LEAVE ROOM ----------------
exports.leaveRoom = async (req, res) => {
  try {
    const { roomId } = req.body;
    const userId = req.userId;

    await ChatRoom.findByIdAndUpdate(roomId, {
      $pull: { members: userId }
    });

    res.json({ message: "Left room" });
  } catch (error) {
    res.status(500).json({ message: "Failed to leave room", error: error.message });
  }
};
