const express = require("express");

const cors=require("cors");
const rootRouter=require("./routes/index");


const app=express();
app.use(cors());
app.use(express.json());
//routing request
app.use("/api/v1",rootRouter);
console.log("Listening");
app.listen(3000);

//all requests going to /api/v1/user


// app.use(json());

// app.post("/signup",(req,res)=>{

// })

// app.post("/signup",(req,res)=>{

// })

// app.put("/update",(req,res)=>{

// })