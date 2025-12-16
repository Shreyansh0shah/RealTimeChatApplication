const router = require("express").Router();
const { sendEmailNotification } = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/email", authMiddleware, sendEmailNotification);

module.exports = router;
