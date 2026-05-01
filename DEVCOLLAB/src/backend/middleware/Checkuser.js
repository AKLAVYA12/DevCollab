import express from 'express';
import bcrypt from 'bcrypt';
import db from "../db.js";
import jwt from 'jsonwebtoken';

const router_checkuser = express.Router();

router_checkuser.post("/checkuser", (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password || !email.includes("@gmail.com")){return res.status(500).json({message : "parameter misding"})};
    
    const querry = "SELECT id , email , name, password from register_user WHERE email = ?";
    db.query(querry,[email],async (err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).json({message : err});
        }

        if(!result || result.length === 0){
            return res.status(500).json({message : "pass and mail is wrong or empty"});
        }

        const check_hash = await bcrypt.compare(password,result[0].password);
        if(!check_hash){
            return res.status(500).json({message : "password do not match"});
        }
        const token = jwt.sign(
        {userId : result[0].id,
        name : result[0].name},
        process.env.JWT_KEY,
        {expiresIn : "1h"}
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 10 * 50 * 1000
        });
        return res.json({message : "login success" , name : result[0].name , token : token, id : result[0].id});
    });
});

export default router_checkuser;
