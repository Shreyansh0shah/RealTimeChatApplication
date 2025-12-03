// config/redis.js
const { createClient } = require("redis");

const redisClient = createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379
  }
});

const pubClient = redisClient.duplicate();
const subClient = redisClient.duplicate();

// Connect all clients
(async () => {
  try {
    await redisClient.connect();
    await pubClient.connect();
    await subClient.connect();
    console.log("Redis connected successfully!");
  } catch (err) {
    console.error("Redis connection error:", err);
  }
})();

module.exports = { redisClient, pubClient, subClient };
