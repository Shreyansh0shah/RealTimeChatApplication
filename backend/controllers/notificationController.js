const User = require("../models/User");
const { sendEmail } = require("../utils/emailService");

/* -------------------- SEND EMAIL NOTIFICATION -------------------- */
exports.sendEmailNotification = async (req, res) => {
  try {
    // ✅ AUTH CHECK (FIXED)
    if (!req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { receiverId, messageText } = req.body;

    if (!receiverId || !messageText) {
      return res.status(400).json({ message: "receiverId and messageText required" });
    }

    // Find receiver user
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    // Send email
    await sendEmail({
      to: receiver.email,
      subject: "New Message Notification",
      text: `You have received a new message:\n\n"${messageText}"`
    });

    console.log("Email notification sent to:", receiver.email);

    res.json({
      message: "Email notification sent successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to send email notification",
      error: error.message
    });
  }
};
