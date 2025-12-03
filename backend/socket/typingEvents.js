module.exports = (io, onlineUsers) => {
  io.on("connection", (socket) => {

    socket.on("typing-start", (data) => {
      console.log("TYPING-START RECEIVED ON SERVER:", data);

      const { senderId, receiverId } = data;
      const receiverSocket = onlineUsers[receiverId];

      if (receiverSocket) {
        io.to(receiverSocket).emit("typing-start", { senderId });
      }
    });

    socket.on("typing-stop", (data) => {
      console.log("TYPING-STOP RECEIVED ON SERVER:", data);

      const { senderId, receiverId } = data;
      const receiverSocket = onlineUsers[receiverId];

      if (receiverSocket) {
        io.to(receiverSocket).emit("typing-stop", { senderId });
      }
    });

  });
};
