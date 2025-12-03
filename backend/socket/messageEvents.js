// socket/messageEvents.js
const Message = require("../models/Message");

module.exports = (io, onlineUsers) => {
  io.on("connection", (socket) => {
    socket.on("send-message", async ({ senderId, receiverId, messageText }) => {
      try {
        const newMessage = new Message({ senderId, receiverId, messageText });
        await newMessage.save();
        console.log("Socket saved message:", newMessage);

        // emit only to receiver if online
        const receiverSocketId = onlineUsers[receiverId];
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive-message", newMessage);
        } else {
          // optionally queue notification or set as unread
          console.log("Receiver is offline:", receiverId);
        }

      } catch (err) {
        console.error("Socket send-message error:", err);
      }
    });
  });
};
