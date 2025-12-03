// socket/typingEvents.js
const { redisClient } = require("../config/redis");

module.exports = (io) => {
  io.on("connection", (socket) => {
    // data: { senderId, receiverId?, roomId? }
    socket.on("typing-start", async (data) => {
      try {
        const { senderId, receiverId, roomId } = data;

        if (roomId) {
          // broadcast typing to room (except sender)
          socket.to(roomId).emit("typing-start", { senderId, roomId });
          return;
        }

        if (!receiverId) return;

        const receiverSocketId = await redisClient.hget("onlineUsers", receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("typing-start", { senderId });
        }
      } catch (err) {
        console.error("typing-start error:", err);
      }
    });

    socket.on("typing-stop", async (data) => {
      try {
        const { senderId, receiverId, roomId } = data;

        if (roomId) {
          socket.to(roomId).emit("typing-stop", { senderId, roomId });
          return;
        }

        if (!receiverId) return;

        const receiverSocketId = await redisClient.hget("onlineUsers", receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("typing-stop", { senderId });
        }
      } catch (err) {
        console.error("typing-stop error:", err);
      }
    });
  });
};
