// socket/index.js

// Optional: only needed if some event files use redis client directly
const { redisClient } = require("../config/redis");

// Import all event modules
const userEvents = require("./userEvents");
const messageEvents = require("./messageEvents");
const typingEvents = require("./typingEvents");
const deliveryEvents = require("./deliveryEvents");
const roomEvents = require("./roomEvents");
const notificationEvents = require("./notificationEvents");

module.exports = (io) => {
  // Attach all event handlers

  // User events (login, add-user, disconnect)
  userEvents(io);

  // Chat-related events
  messageEvents(io);
  typingEvents(io);
  deliveryEvents(io);

  // Group / Room features
  roomEvents(io);

  // Notifications (email / offline alerts — Day 21)
  notificationEvents(io);

  console.log("All socket event modules loaded.");
};
