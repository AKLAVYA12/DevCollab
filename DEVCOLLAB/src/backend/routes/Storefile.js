import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import db from '../db.js';
const router_fileuplode = express.Router();
const uplode = multer({
    storage : multer.memoryStorage()
});

router_fileuplode.post("/",uplode.single("pdf"),(req,res)=>{
    try {
        const token = req.cookies?.token;
        const decode = jwt.verify(token,process.env.JWT_KEY);
        const id = decode.userId;
        const name = decode.name;
        const fileData = req.file.buffer;
        const projectName = req.body.projectName;
        const querry = "INSERT INTO project(files,name,created_by,user_id) VALUES(?,?,?,?)";
        db.query(querry,[fileData,projectName,name,id],(err,result)=>{
            if(err){
                console.log(err);
                return res.status(402).json({message : err});
            }
            res.json(result.files);
        })
    } catch (error) {
        console.log(error.message);
    }
});
export default router_fileuplode;