// socket/messageEvents.js
const { redisClient } = require("../config/redis");

module.exports = (io) => {
  io.on("connection", (socket) => {
    // data: { senderId, receiverId, roomId?, message }
    socket.on("send-message", async (data) => {
      try {
        const { senderId, receiverId, roomId, message } = data;
        if (roomId) {
          // Room message: broadcast to that room (server cluster-aware via redis adapter)
          io.to(roomId).emit("room-message", {
            roomId,
            senderId,
            message,
            timestamp: Date.now(),
          });

          // Ack to sender
          socket.emit("message-sent-ack", {
            status: "ok",
            roomId,
            timestamp: Date.now(),
          });
          return;
        }

        // 1:1 message: look up receiver socket id in Redis
        if (!receiverId) {
          socket.emit("message-sent-ack", { status: "error", reason: "no receiverId" });
          return;
        }

        const receiverSocketId = await redisClient.hget("onlineUsers", receiverId);

        if (receiverSocketId) {
          // Send message directly to receiver's socket
          io.to(receiverSocketId).emit("private-message", {
            senderId,
            message,
            timestamp: Date.now(),
          });

          // Optionally ack to sender that message was forwarded
          socket.emit("message-sent-ack", { status: "delivered-to-server", timestamp: Date.now() });
        } else {
          // Receiver offline — you can choose to store undelivered messages in DB here
          socket.emit("message-sent-ack", { status: "receiver-offline", timestamp: Date.now() });
        }
      } catch (err) {
        console.error("send-message error:", err);
        socket.emit("message-sent-ack", { status: "error", reason: err.message });
      }
    });

    // Optional: join room event so io.to(roomId) works
    socket.on("join-room", (roomId) => {
      if (!roomId) return;
      socket.join(roomId);
    });

    socket.on("leave-room", (roomId) => {
      if (!roomId) return;
      socket.leave(roomId);
    });
  });
};
