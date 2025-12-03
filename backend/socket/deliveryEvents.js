// socket/deliveryEvents.js
const { redisClient } = require("../config/redis");

module.exports = (io) => {
  io.on("connection", (socket) => {
    // data: { messageId, senderId, receiverId, timestamp? }
    socket.on("message-delivered", async (data) => {
      try {
        const { messageId, senderId, receiverId, timestamp } = data;
        if (!senderId || !receiverId || !messageId) return;

        // Notify original sender that message was delivered to recipient's device
        const senderSocketId = await redisClient.hget("onlineUsers", senderId);
        if (senderSocketId) {
          io.to(senderSocketId).emit("message-delivered-ack", {
            messageId,
            receiverId,
            timestamp: timestamp || Date.now(),
          });
        }
      } catch (err) {
        console.error("message-delivered error:", err);
      }
    });

    // data: { messageId, senderId, receiverId, timestamp? }
    socket.on("message-read", async (data) => {
      try {
        const { messageId, senderId, receiverId, timestamp } = data;
        if (!senderId || !receiverId || !messageId) return;

        // Notify original sender that message was read
        const senderSocketId = await redisClient.hget("onlineUsers", senderId);
        if (senderSocketId) {
          io.to(senderSocketId).emit("message-read-ack", {
            messageId,
            receiverId,
            timestamp: timestamp || Date.now(),
          });
        }
      } catch (err) {
        console.error("message-read error:", err);
      }
    });
  });
};
