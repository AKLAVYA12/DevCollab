import express from 'express';
const router_verifyjwt = express.Router();
import verifyjwt from "../middleware/VerifyJwt.js";
import db from "../db.js";

router_verifyjwt.get("/", verifyjwt, (req, res) => {
    const query = "SELECT COUNT(*) AS projectCount FROM project WHERE user_id = ?";

    db.query(query, [req.user.userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Failed to fetch dashboard data"
            });
        }

        res.json({
            message: "Welcome to dashboard",
            user: req.user,
            id: req.user.userId,
            name: req.user.name,
            projectCount: result[0]?.projectCount ?? 0
        });
    });
});

export default router_verifyjwt;
