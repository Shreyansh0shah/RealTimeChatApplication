// const Message=require("../models/Message");
// module.exports=(io)=>{
//      // Store connected users and their socket IDs
//     let onlineUsers={};

//     //Socket Connection
//     // When a user connects
// io.on("connection",(socket)=>{
//     console.log("user connected",socket.id);

//     socket.on("add-user",(userId)=>{
//         onlineUsers[userId]=socket.id;

//         io.emit("online-users",Object.keys(onlineUsers));
//         console.log("user added:",userId);
//     });

//     // Listen for send-message event
//     socket.on("send-message", async(data)=>{
//         const{senderId,receiverId,messageText}=data;

//         // Save message to database
//         const newMessage=new Message({senderId,receiverId,messageText});
//         await newMessage.save();

//         // Find receiver socketId
//         const receiverSocketId=onlineUsers[receiverId];
//         // Deliver message in real-time
//         if (receiverSocketId) {
//             io.to(receiverSocketId).emit("receive-message", newMessage);
//         }
//     });
//     // User disconnects → remove from online list
//     socket.on("disconnect",()=>{
//         console.log("user disconnected ",socket.id);
//     });

//      // Remove user from online list
//      for(let userId in onlineUsers){
//         if(onlineUsers[userId]===socket.id){
//             delete onlineUsers[userId];
//         }
//     }
//     // Update online list for all users
//     io.emit("online-users",Object.keys(onlineUsers));
// });
// };