// middleware/aiMiddleware.js

const { analyzeMessage } = require("../utils/aiClient");

module.exports = (req, res, next) => {
  const { messageText } = req.body;

  if (!messageText) {
    return res.status(400).json({ message: "Message text required" });
  }

  const analysis = analyzeMessage(messageText);

  if (analysis.toxic) {
    return res.status(403).json({
      message: "Message blocked: toxic content",
      analysis
    });
  }

  // attach AI result to request
  req.aiResult = analysis;

  next();
};
