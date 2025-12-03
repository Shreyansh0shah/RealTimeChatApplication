module.exports = (io, onlineUsers) => {
  
  io.on("connection", (socket) => {

    // JOIN ROOM
    socket.on("join-room", ({ roomId }) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    // LEAVE ROOM
    socket.on("leave-room", ({ roomId }) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room ${roomId}`);
    });

    // SEND MESSAGE TO ROOM
    socket.on("room-message", ({ roomId, message }) => {
      io.to(roomId).emit("room-message", message);
      console.log("Room message:", roomId, message);
    });

  });
};