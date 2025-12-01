// Load environment variables
require("dotenv").config();

// Import modules
const connectDB=require("./config/db");
const http=require("http");
const express=require("express");
const {Server}=require("socket.io");
const cors = require("cors"); //


// Initialize app
const app=express();

// ADD: Enable CORS
app.use(cors());


// Connect MongoDB
connectDB();

// Create HTTP server
const server=http.createServer(app);
// Create Socket.IO server
const io = new Server(server,{
    cors:{
        origin:"*"
    }
});


// JSON middleware
app.use(express.json());

//require('./config/dbconfig');
const PORT=process.env.PORT || 5001;

app.get("/",(req,res)=>{ 
    //console.log("Backend is running!");
    res.send("backend is running");
});

//Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

// 🟩 ADD: 404 Handler – place AFTER all routes
app.use((req,res)=>{
    res.status(404).json({message:"Route not found"});
})


// Socket Server
const socketServer=require("./socket/socketServer");
socketServer(io);


// -------------------- 404 ERROR HANDLER --------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Start Server
server.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
});