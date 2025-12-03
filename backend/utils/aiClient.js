// utils/aiClient.js (safe version)

exports.analyzeMessage = (text) => {
  const lower = text.toLowerCase();

  let toxic = false;
  let urgency = "normal";

  // Pattern-based toxicity detection 

  if (
    lower.includes("abuse") ||
    lower.includes("insult") ||
    lower.includes("offensive") ||
    lower.includes("rude")
  ) {
    toxic = true;
  }

  // Urgency detection
  if (
    lower.includes("help") ||
    lower.includes("urgent") ||
    lower.includes("emergency") ||
    lower.includes("please respond")
  ) {
    urgency = "high";
  }

  return { toxic, urgency };
};
