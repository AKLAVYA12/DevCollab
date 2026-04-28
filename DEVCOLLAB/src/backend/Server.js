import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router_register from './routes/Register.js';
import router_checkuser from './middleware/Checkuser.js';
import router_verifyjwt from './routes/router_verifyjwt.js';
import router_fileuplode from './routes/Storefile.js';
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT =3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/auth",router_register);
app.use("/auth",router_checkuser);
app.use("/dashboard",router_verifyjwt);
app.use("/uplodefile",router_fileuplode);

app.listen(PORT,()=>{
    console.log("server running...");
});