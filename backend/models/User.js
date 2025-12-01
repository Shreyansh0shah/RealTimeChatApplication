const mongoose=require("mongoose");


const userScheme =new mongoose.Schema(
    {
        username:{
            type:String ,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            require:true,

        }
    },
    //timestamps: true Automatically adds: createdAt updatedAt
    {timestamps:true}
)
module.exports =mongoose.model("user",userScheme);