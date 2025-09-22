const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://admin:zr0ndBk2yw6vQJpM@cluster0.30v1we1.mongodb.net/mini-pay");

const userSchema=new mongoose.Schema({
    //adding constraints to the fields
    userName:{
        type:String,
        required:true,
        unique:true,
        minLength:3,
        lowercase:true,//username should br in lower case
        maxLength:15
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:15
    },
    lastName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:15
    }
    
});

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

const User=mongoose.model("User",userSchema);
const Account=mongoose.model("Account",accountSchema);
module.exports={
    User,
    Account
};