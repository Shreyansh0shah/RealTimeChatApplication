// socket/userEvents.js
const { redisClient } = require("../config/redis");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    // ADD USER
    socket.on("add-user", async (userId) => {
      if (!userId) return;

      // Store user in Redis
      await redisClient.hset("onlineUsers", userId, socket.id);

      // Fetch updated list
      const users = await redisClient.hkeys("onlineUsers");

      // Notify everyone
      io.emit("online-users", users);
    });

    // DISCONNECT USER
    socket.on("disconnect", async () => {
      console.log("SOCKET DISCONNECTED:", socket.id);

      // Get all users
      const allUsers = await redisClient.hgetall("onlineUsers");

      // Find which user had this socket id
      for (const [uid, sid] of Object.entries(allUsers)) {
        if (sid === socket.id) {
          await redisClient.hdel("onlineUsers", uid);
          break;
        }
      }

      // Emit updated list
      const users = await redisClient.hkeys("onlineUsers");
      io.emit("online-users", users);

      console.log("user disconnected", socket.id);
    });
  });
};
