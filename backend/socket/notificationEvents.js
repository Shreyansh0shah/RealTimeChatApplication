const sendEmail = require("../utils/emailService");

const User = require("../models/User");

module.exports = (io) => {

  io.on("connection", (socket) => {
     // Triggered when someone sends a message to an offline user
    socket.on("send-notification", async ({ receiverId,senderName, messageText }) => {
      try{
      const receiver = await User.findById(receiverId);

       if (!receiver || !receiver.email) {
          console.log("Receiver email not found");
          return;
        }
        const subject = `New message from ${senderName}`;
        const text = `Message: ${messageText}`;

        await sendEmail(receiver.email, subject, text);
      }
        
        catch(err){
      console.log("Notification offline user error:", err);
    }
    });
  });
};
