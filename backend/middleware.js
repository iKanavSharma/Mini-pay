const jwt=require("jsonwebtoken");
const JWT_SECRET=require("./config");

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    // console.log(authHeader);
    //check
    if(!authHeader || !authHeader.startsWith('Bearer')){
        //console.log("in");
        return res.status(403).json({message:"error"});
    }
    // console.log("passed");
    const token=authHeader.split(' ')[1];//convert into array
    // console.log("[ "+token+" ]");
    // console.log();
    //verifying token
    try{
        const decodedToken=jwt.verify(token,JWT_SECRET);
        // console.log(JWT_SECRET);
        for (const key in decodedToken){
            console.log(key,":",decodedToken[key]);
        }
        // console.log();
        // console.log(decodedToken);
        req.userId=decodedToken.userId;
        // console.log(req.userId);
        // console.log();
        // console.log(decodedToken.userId);
        next();
    }catch(e){
        return res.status(403).json({message:"Something went wrong"});
    }

}

module.exports={
    authMiddleware
}