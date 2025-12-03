// socket/deliveryEvents.js
const Message = require("../models/Message");

module.exports = (io, onlineUsers) => {
  io.on("connection", (socket) => {
    // Receiver tells server: message is delivered to my device (displayed in chat)
    socket.on("message-delivered", async ({ messageId, receiverId, senderId }) => {
      try {
        if (!messageId) return;

        // Update DB
        const updated = await Message.findByIdAndUpdate(messageId, { status: "delivered" }, { new: true });

        // Emit update back to sender (if online)
        const senderSocketId = onlineUsers[senderId];
        if (senderSocketId) {
          io.to(senderSocketId).emit("message-delivered", { messageId, receiverId });
        } else {
          // sender offline - optionally store or send notification later
          console.log("Sender offline for delivered event:", senderId);
        }

        console.log("Delivery event processed:", messageId);
      } catch (err) {
        console.error("deliveryEvents: message-delivered error:", err);
      }
    });

    // Receiver tells server: message has been read/opened by me
    socket.on("message-read", async ({ messageId, receiverId, senderId }) => {
      try {
        if (!messageId) return;

        const updated = await Message.findByIdAndUpdate(messageId, { status: "read" }, { new: true });

        const senderSocketId = onlineUsers[senderId];
        if (senderSocketId) {
          io.to(senderSocketId).emit("message-read", { messageId, receiverId });
        } else {
          console.log("Sender offline for read event:", senderId);
        }

        console.log("Read event processed:", messageId);
      } catch (err) {
        console.error("deliveryEvents: message-read error:", err);
      }
    });
  });
};
