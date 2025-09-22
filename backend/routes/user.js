const express=require("express");
const jwt=require("jsonwebtoken");
const {User}=require("../db");
const {Account}=require("../db");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

const router=express.Router();

//zod validation
//all requests going to "api/v1/user"

router.post("/signup",async (req,res)=>{
    const {userName,password,firstName,lastName}=req.body;
    try{
        //if user already exist 
        const user=await User.findOne({
            userName
        });
        if(user){
            res.json({
                message:"Username already exist"
            })
            return;
        }
        //user is unique
        const newUser=await User.create({
            userName,
            password,
            firstName,
            lastName
        });
        const userId=newUser._id;
        //give balance to user during signup
        await Account.create({
            userId,
            balance:1+Math.random()*10000
        })
        
        const token=jwt.sign({
            userId
        },JWT_SECRET)
        //returning token
        res.json({
            message:"User created succesfully",
            token
        })
        

    }catch(e){
        res.json({
            message:e.message
        })
    }
})

router.post("/signin",async (req,res)=>{
    const {userName,password}=req.body;
    //checking whether username exist or not
    const user=await User.findOne({
        userName,
        password
    });
    //user exist
    if(user){
        //generate token
        // console.log(user);
        // console.log();
        // console.log(user._id);
        const token=jwt.sign({
            userId:user._id.toString()
        },JWT_SECRET);
        res.json({
            message:"Sign in successful",
            token,
            // user
        })
        return;
    }

    

    res.status(411).json({
        message:"Error while logging in"
    })
})

//put request
//pass middelware
router.put("/update",authMiddleware,async (req,res)=>{
    
    try{
        const {userName,firstName,lastName}=req.body;
        // console.log(userName);
        const user=await User.updateOne({
            userName,
            firstName,
            lastName
        })
        if(user){
            res.json({
                message:"Updated Succesfully"
            })
            return;
        }
        res.json({
            message:"Error while updating information"
        })
    }catch(e){
        res.json({
            message:e.message
        })
    }
    
})

//get request to get the users starting or ending  with the string enetered by user
//does not share password
//matchin substring
//query parameter
router.get("/bulk",async (req,res)=>{
    const filter=req.query.filter ||"";
    console.log(filter);
    //find string in db
    const users=await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })
    console.log(users);
    res.json({
        user:users.map(user=>({
            userName:user.userName,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

module.exports=router;

