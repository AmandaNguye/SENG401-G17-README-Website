import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

function verifyJWTRequired(req, res, next) {
    const token = req.headers["x-access-token"]?.split(" ")[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.json({
                    isLoggedIn: false,
                    message: "Failed To Authenticate",
                });
            req.user = {};
            req.user.id = decoded.id;
            req.user.username = decoded.username;
            next();
        });
    } else {
        res.json({ message: "Incorrect Token Given", isLoggedIn: false });
    }
}

function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(" ")[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.json({
                    isLoggedIn: false,
                    message: "Failed To Authenticate",
                });
            req.user = {};
            req.user.id = decoded.id;
            req.user.username = decoded.username;
            next();
        });
    }
    else {
        req.user = {};
        req.user.username = "";
        next();
    }
}

export default router;