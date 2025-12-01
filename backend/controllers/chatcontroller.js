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
            messageText
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
