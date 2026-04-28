import express from 'express';
const router_verifyjwt = express.Router();
import verifyjwt from "../middleware/VerifyJwt.js";

router_verifyjwt.get("/", verifyjwt, (req, res) => {
    res.json({
        message: "Welcome to dashboard",
        user: req.user,
        id: req.user.userId,
        name: req.user.name
    });
});

export default router_verifyjwt;