const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongoose connected succesfully");
    }catch(error){
        console.log("Mongoose connection Failed!");
        process.exit(1);

    }
}
module.exports = connectDB;