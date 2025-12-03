// controllers/aiController.js

const { analyzeMessage } = require("../utils/aiClient");

exports.analyze = (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "Text required" });

  const result = analyzeMessage(text);
  return res.json({ result });
};
