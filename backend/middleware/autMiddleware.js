const jwt =require("jsonwebtoken");

const authMiddleware=(req,res,next)=>{
    try{
        const authHeader= req.headers.authorization;
        if(!authHeader||!authHeader.startsWith("Bearer")){
            return res.status(400).json({message:"Unauthorized: No token"});
        }

        //extracting token We only need the token part (after Bearer).
        const token=authHeader.split(' ')[1];

        //verify token 
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //add userid to request object 
        req.userId=decoded.userId;
        //next step allows request to move to actual controller.
        next();

    }catch(error){
        return res.status(401).json({message:"Unauthorized: Invalid token",error:error.message});
    }
};
module.exports=authMiddleware;