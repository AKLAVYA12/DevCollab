import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT =3000;

app.post("/register", async (req,res)=>{
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

            res.json({ message: "data stored" });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT,()=>{
    console.log("server running...");
});