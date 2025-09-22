const express=require("express");
const { authMiddleware } = require("../middleware");
const {Account}=require("../db")
const mongoose=require("mongoose");
const router=express.Router();

//get->to get their balance
//passing middleware 
router.get("/balance",authMiddleware,async (req,res)=>{
    const account=await Account.findOne({
        userId:req.userId,
    });
    // console.log(req.userId);
    // console.log(account);
    res.json({
        balance:account.balance
    })
})

//tranfer money
//reducing money from one account
//increasing money into second account
// approach 1->without trnsactions
// approach 2->with transactions
//pass middleware
router.post("/transfer",authMiddleware,async (req,res)=>{
    try{
        // console.log("hi");
        // console.log("hi");
        const session=await mongoose.startSession();
        // console.log(session);
        session.startTransaction();
        //normal code
        const {amount,to}=req.body;
        // console.log(amount);
        // console.log(to);
        //fetch account within trnxsns
        const account=await Account.findOne({userId:req.userId}).session(session);
        // console.log(account);
        if(!account || account.balance<amount){
            await session.abortTransaction();
            return res.status(400).json({
                message:"Insufficient balance"
            });
        }
        //receving account
        const toAccount=await Account.findOne({userId:to}).session(session);
        // console.log(toAccount);
        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message:"Invalid Account"
            })
        }

        //everything is normal
        //transaction occur
        //update
        await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
        // console.log(req.userId);
        await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

        //commit traxns
        await session.commitTransaction();
        
        res.json({
            message:"Transfer successful"
        })
    }catch(e){
        res.json({
            message:"Something went wrong"
        })
    }
})

module.exports=router;