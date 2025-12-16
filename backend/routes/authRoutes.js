console.log("AUTH ROUTES FILE LOADED!");

const router = require("express").Router();

// 🔹 CONTROLLER (NOTE: filename case-sensitive on Mac/Linux)
const {
  signup,
  login,
  refresh,
  logout
} = require("../controllers/authcontroller");

// 🔹 RATE LIMITER & VALIDATION (UNCHANGED)
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

// ------------------ REFRESH TOKEN ROUTE (NEW - DAY 24) ------------------
router.post("/refresh", refresh);

// ------------------ LOGOUT ROUTE (NEW - DAY 24) ------------------
router.post("/logout", logout);

// ------------------ TEST ROUTE ------------------
router.get("/test", (req, res) => {
  res.send("Auth route working!");
});

module.exports = router;
