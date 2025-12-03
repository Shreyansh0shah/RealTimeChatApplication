// socket/userEvents.js
module.exports = (io, onlineUsers) => {
  io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    socket.on("add-user", (userId) => {
      if (!userId) return;
      onlineUsers[userId] = socket.id;
        console.log("USER ADDED MAP:", onlineUsers);  
      io.emit("online-users", Object.keys(onlineUsers));
    });

    socket.on("disconnect", () => {
         console.log("SOCKET DISCONNECTED:", socket.id);
      for (const [uid, sid] of Object.entries(onlineUsers)) {
        if (sid === socket.id) {
          delete onlineUsers[uid];
          break;
        }
      }
      io.emit("online-users", Object.keys(onlineUsers));
      console.log("user disconnected", socket.id);
    });
  });
};
