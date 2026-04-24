import express from 'express';
import jwt from "jsonwebtoken";
const router_verifyjwt = express.Router();

function verifyjwt(req,res,next){
    const token = req.cookies?.token;
    if(!token){
        return res.status(401).json({ message: "token missing or invalid" });
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch(err){
        return res.status(403).json({ message: "invalid token" });
    }
}

router_verifyjwt.get("/",verifyjwt,(req,res)=>{
    res.json({message : "ok", user : req.user});
})

export default router_verifyjwt;