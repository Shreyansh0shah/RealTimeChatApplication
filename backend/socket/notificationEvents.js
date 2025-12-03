module.exports = (io, onlineUsers) => {
  console.log("notificationEvents loaded");

  io.on("connection", (socket) => {
    socket.on("send-notification", ({ userId, message }) => {
      const receiverSocket = onlineUsers[userId];

      if (receiverSocket) {
        io.to(receiverSocket).emit("new-notification", message);
      }

      console.log("Notification event processed:", message);
    });
  });
};
