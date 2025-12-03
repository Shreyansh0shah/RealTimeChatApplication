const Message=require("../models/Message");

// -------------------- SEND MESSAGE --------------------
exports.sendMessage=async(req,res)=>{
    try{
        const {receiverId,messageText}=req.body;

        //senderId comes from token (authMiddleware)
        const senderId=req.userId

        // Validate fields
        if(!receiverId||!messageText){
            return res.status(400).json({Message:"Reciever and message required"});
        }
        //Create message object
        const newMessage=new Message({
            senderId,
            receiverId,
            messageText,
            aiResult: req.aiResult // Include AI result in message
        });
        //Save to database
        await newMessage.save();
        console.log("Message sent:", newMessage);  // 🟩 ADD DEBUG LOG

        //send response
        res.status(201).json({
            message:"Message send succesfully",
            data:newMessage
        });


    }catch(error){
        res.status(500).json({
            message:"Failed to send message",
            error:error.message
        });
    }
}

// -------------------- GET MESSAGES --------------------
exports.getMessage=async(req,res)=>{
    try{
        const user1 =req.userId;//logged-in user
        const user2=req.params.userId //other user
        //validate
        if(!user2){
            return res.status(400).json({message:"UserId required"});
        }

        //finding message between both users 
        const message =await Message.find({
            $or:[
                {senderId:user1, receiverId:user2},
                {senderId:user2,receiverId:user1}
            ]
        }).sort({createdAt:1});//sort by oldest → newest

        //Return response
        res.status(200).json({
            message:"Chat history loaded",
            data:message
        });


    }catch(error){
        res.status(500).json({
            message:"Failed to fetch messages",
            error:error.message
        });

    }
};

// ---- New functions for delivery receipts ----
exports.markMessageDelivered = async (req, res) => {
  try {
    const { messageId } = req.body;
    if (!messageId) return res.status(400).json({ message: "messageId required" });

    const updated = await Message.findByIdAndUpdate(
      messageId,
      { status: "delivered" },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Message not found" });

    console.log("Message marked delivered:", updated._id);
    return res.json({ message: "Marked delivered", data: updated });
  } catch (error) {
    return res.status(500).json({ message: "Failed to mark delivered", error: error.message });
  }
};

exports.markMessageRead = async (req, res) => {
  try {
    const { messageId } = req.body;
    if (!messageId) return res.status(400).json({ message: "messageId required" });

    const updated = await Message.findByIdAndUpdate(
      messageId,
      { status: "read" },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Message not found" });

    console.log("Message marked read:", updated._id);
    return res.json({ message: "Marked read", data: updated });
  } catch (error) {
    return res.status(500).json({ message: "Failed to mark read", error: error.message });
  }
};