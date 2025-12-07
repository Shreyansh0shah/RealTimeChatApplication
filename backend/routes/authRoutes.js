console.log("AUTH ROUTES FILE LOADED!");

const router = require("express").Router();
const { signup, login } = require("../controllers/authcontroller");

const { authLimiter } = require("../middleware/rateLimiter");
const { body } = require("express-validator");
const validateRequest = require("../middleware/validateRequest");

// ------------------ SIGNUP ROUTE ------------------
router.post(
  "/signup",
  authLimiter,
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  validateRequest,
  signup
);

// ------------------ LOGIN ROUTE ------------------
router.post(
  "/login",
  authLimiter,
  body("email").isEmail(),
  body("password").exists(),
  validateRequest,
  login
);

// ------------------ TEST ROUTE ------------------
router.get("/test", (req, res) => {
  res.send("Auth route working!");
});

module.exports = router;
