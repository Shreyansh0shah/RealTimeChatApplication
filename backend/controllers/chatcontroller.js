const Message = require("../models/Message");

// -------------------- SEND MESSAGE --------------------
exports.sendMessage = async (req, res) => {
  try {
    // ✅ AUTH CHECK (correct)
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { receiverId, messageText } = req.body;

    const senderId = req.userId; // ✅ correct

    if (!receiverId || !messageText) {
      return res.status(400).json({ message: "Receiver and message required" });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      messageText,
      aiResult: req.aiResult
    });

    await newMessage.save();

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to send message",
      error: error.message
    });
  }
};

// -------------------- GET MESSAGES --------------------
exports.getMessage = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user1 = req.userId;          // ✅ correct
    const user2 = req.params.userId;

    if (!user2) {
      return res.status(400).json({ message: "UserId required" });
    }

    const messages = await Message.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json({
      message: "Chat history loaded",
      data: messages
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch messages",
      error: error.message
    });
  }
};

// -------------------- DELIVERY RECEIPTS --------------------
exports.markMessageDelivered = async (req, res) => {
  try {
    const { messageId } = req.body;

    if (!messageId) {
      return res.status(400).json({ message: "messageId required" });
    }

    const updated = await Message.findByIdAndUpdate(
      messageId,
      { status: "delivered" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Marked delivered", data: updated });

  } catch (error) {
    res.status(500).json({ message: "Failed to mark delivered", error: error.message });
  }
};

exports.markMessageRead = async (req, res) => {
  try {
    const { messageId } = req.body;

    if (!messageId) {
      return res.status(400).json({ message: "messageId required" });
    }

    const updated = await Message.findByIdAndUpdate(
      messageId,
      { status: "read" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Marked read", data: updated });

  } catch (error) {
    res.status(500).json({ message: "Failed to mark read", error: error.message });
  }
};
