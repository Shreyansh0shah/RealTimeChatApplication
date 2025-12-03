// socket/index.js
module.exports = (io) => {
  // shared map: userId -> socketId
  const onlineUsers = {};

  // load modules with the same io and onlineUsers
  require("./userEvents")(io, onlineUsers);
  require("./messageEvents")(io, onlineUsers);
  require("./deliveryEvents")(io, onlineUsers);
  require("./typingEvents")(io, onlineUsers);
  require("./roomEvents")(io, onlineUsers);
  require("./notificationEvents")(io, onlineUsers);
 

};
