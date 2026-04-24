import express from 'express';
import bcrypt from 'bcrypt';
import db from "../db.js";

const router_register = express.Router();

router_register.post("/register", async (req,res)=>{
    try {
        const { name, email, pass1 } = req.body;

        if (!name || !email || !pass1) {
            return res.status(400).json({ error: "missing parameters" });
        }

        const hash_pass = await bcrypt.hash(pass1, 10);

        const query = "INSERT INTO register_user(name,email,password) VALUES (?,?,?)";

        db.query(query, [name, email, hash_pass], (err, result) => {
            if (err) {
                 console.log("DB ERROR:", err);
                return res.status(500).json({ error: err.message });
            }

            res.json({ message: true });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router_register;
