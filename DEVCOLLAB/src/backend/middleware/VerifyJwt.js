import jwt from "jsonwebtoken";

function verifyjwt(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: "Token missing"
        });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch (err) {
        res.clearCookie("token");
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expired"
            });
        }
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}

export default verifyjwt;