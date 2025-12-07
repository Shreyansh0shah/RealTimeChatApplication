// Load environment variables
require("dotenv").config();

// Import modules
const connectDB = require("./config/db");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const socketIndex = require("./socket/index");
const { createAdapter } = require("@socket.io/redis-adapter");
const { pubClient, subClient } = require("./config/redis");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const applySecurityHeaders = require("./middleware/securityHeaders");
const { globalLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

applySecurityHeaders(app);

// Connect MongoDB
connectDB();

// Create server
const server = http.createServer(app);

// Socket server
const io = new Server(server, {
  cors: { origin: "*" }
});
io.adapter(createAdapter(pubClient, subClient));
socketIndex(io);

const PORT = process.env.PORT || 5001;

// Basic test route
app.get("/", (req, res) => {
  res.send("backend is running");
});

// Apply limiter AFTER basic test route
app.use(globalLimiter);

// Attach routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/room", require("./routes/roomRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// Error handler
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
